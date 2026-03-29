"""
Tests for pipeline.handler — Lambda orchestration, DynamoDB writes,
budget guards, and error handling.

All AWS calls (DynamoDB) and Zillow API calls are mocked.
"""

import json
import pytest
from unittest.mock import patch, MagicMock, call

from scraper.scoring import Listing
from pipeline.handler import (
    lambda_handler,
    _listing_to_dynamo_item,
    _scrape_zip,
    _write_to_dynamo,
)
from tests.conftest import MOCK_API_RESPONSE, MOCK_EMPTY_RESPONSE


# ═══════════════════════════════════════════════════════════════════
#  _listing_to_dynamo_item()
# ═══════════════════════════════════════════════════════════════════

class TestListingToDynamoItem:
    """Tests for converting Listing objects to DynamoDB item format."""

    def test_sets_zpid_as_id(self):
        listing = Listing(zpid="12345", price=200000, sqft=1000)
        item = _listing_to_dynamo_item(listing, "46220")
        assert item["id"] == {"S": "12345"}
        assert item["zpid"] == {"S": "12345"}

    def test_numeric_fields_are_strings_in_N_type(self):
        listing = Listing(zpid="1", price=250000, sqft=1500.0, bedrooms=3)
        item = _listing_to_dynamo_item(listing, "46220")
        assert item["price"] == {"N": "250000"}
        assert item["sqft"] == {"N": "1500.0"}
        assert item["bedrooms"] == {"N": "3"}

    def test_includes_zip_code(self):
        listing = Listing(zpid="1", price=200000, sqft=1000)
        item = _listing_to_dynamo_item(listing, "46220")
        assert item["zipCode"] == {"S": "46220"}

    def test_includes_appsync_metadata(self):
        listing = Listing(zpid="1", price=200000, sqft=1000)
        item = _listing_to_dynamo_item(listing, "46220")
        assert item["__typename"] == {"S": "Home"}
        assert "createdAt" in item
        assert "updatedAt" in item

    def test_serializes_score_breakdown_as_json(self):
        listing = Listing(zpid="1", price=200000, sqft=1000)
        listing.score_breakdown = {"price_vs_comps": 20.0, "below_zestimate": 10.0}
        item = _listing_to_dynamo_item(listing, "46220")
        parsed = json.loads(item["scoreBreakdown"]["S"])
        assert parsed["price_vs_comps"] == 20.0

    def test_includes_last_scraped_timestamp(self):
        listing = Listing(zpid="1", price=200000, sqft=1000)
        item = _listing_to_dynamo_item(listing, "46220")
        assert "lastScraped" in item
        # ISO format check
        assert "T" in item["lastScraped"]["S"]


# ═══════════════════════════════════════════════════════════════════
#  _scrape_zip()
# ═══════════════════════════════════════════════════════════════════

class TestScrapeZip:
    """Tests for the per-zip scraping and scoring function."""

    def test_returns_scored_listings(self):
        client = MagicMock()
        client.search_listings.return_value = MOCK_API_RESPONSE
        client.request_count = 0

        deals = _scrape_zip(client, "46220")
        assert len(deals) > 0
        assert all(hasattr(d, "deal_score") for d in deals)

    def test_returns_empty_for_no_listings(self):
        client = MagicMock()
        client.search_listings.return_value = MOCK_EMPTY_RESPONSE
        client.request_count = 0

        deals = _scrape_zip(client, "46220")
        assert deals == []

    def test_fetches_page_2_when_available(self):
        multi_page = {**MOCK_API_RESPONSE, "totalPages": 2}
        client = MagicMock()
        client.search_listings.side_effect = [multi_page, MOCK_EMPTY_RESPONSE]
        client.request_count = 0

        _scrape_zip(client, "46220")

        assert client.search_listings.call_count == 2
        client.search_listings.assert_any_call("46220", page=2)

    def test_skips_page_2_when_budget_exhausted(self):
        multi_page = {**MOCK_API_RESPONSE, "totalPages": 2}
        client = MagicMock()
        client.search_listings.return_value = multi_page
        client.request_count = 100  # over budget

        _scrape_zip(client, "46220")
        assert client.search_listings.call_count == 1


# ═══════════════════════════════════════════════════════════════════
#  _write_to_dynamo()
# ═══════════════════════════════════════════════════════════════════

class TestWriteToDynamo:
    """Tests for DynamoDB batch write logic."""

    @patch("pipeline.handler.boto3.client")
    def test_writes_listings_to_table(self, mock_boto):
        mock_dynamo = MagicMock()
        mock_boto.return_value = mock_dynamo

        listings = [
            Listing(zpid="1", address="123 Main St", price=200000, sqft=1000),
            Listing(zpid="2", address="456 Oak Ave", price=300000, sqft=1500),
        ]

        written = _write_to_dynamo("Home-test-staging", listings, "46220")

        assert written == 2
        mock_dynamo.batch_write_item.assert_called_once()

    @patch("pipeline.handler.boto3.client")
    def test_batches_in_groups_of_25(self, mock_boto):
        mock_dynamo = MagicMock()
        mock_boto.return_value = mock_dynamo

        # Create 30 listings → should result in 2 batch calls (25 + 5)
        listings = [
            Listing(zpid=str(i), price=200000, sqft=1000)
            for i in range(30)
        ]

        written = _write_to_dynamo("Home-test", listings, "46220")

        assert written == 30
        assert mock_dynamo.batch_write_item.call_count == 2

    @patch("pipeline.handler.boto3.client")
    def test_handles_empty_list(self, mock_boto):
        mock_dynamo = MagicMock()
        mock_boto.return_value = mock_dynamo

        written = _write_to_dynamo("Home-test", [], "46220")

        assert written == 0
        mock_dynamo.batch_write_item.assert_not_called()


# ═══════════════════════════════════════════════════════════════════
#  lambda_handler()
# ═══════════════════════════════════════════════════════════════════

class TestLambdaHandler:
    """Tests for the Lambda entry point — end-to-end orchestration."""

    @patch("pipeline.handler._write_to_dynamo")
    @patch("pipeline.handler.ZillowClient")
    def test_processes_all_configured_zips(self, mock_client_cls, mock_write, monkeypatch):
        monkeypatch.setenv("RAPIDAPI_KEY", "test-key")
        monkeypatch.setenv("HOME_TABLE_NAME", "Home-test")

        mock_client = MagicMock()
        mock_client.search_listings.return_value = MOCK_API_RESPONSE
        mock_client.request_count = 0
        mock_client_cls.return_value = mock_client

        mock_write.return_value = 5

        result = lambda_handler({"zip_codes": ["46220", "46205"]}, None)

        assert result["status"] == "complete"
        assert result["zips_processed"] == 2
        assert "46220" in result["results"]
        assert "46205" in result["results"]

    @patch("pipeline.handler._write_to_dynamo")
    @patch("pipeline.handler.ZillowClient")
    def test_uses_custom_zip_codes_from_event(self, mock_client_cls, mock_write, monkeypatch):
        monkeypatch.setenv("RAPIDAPI_KEY", "test-key")
        monkeypatch.setenv("HOME_TABLE_NAME", "Home-test")

        mock_client = MagicMock()
        mock_client.search_listings.return_value = MOCK_API_RESPONSE
        mock_client.request_count = 0
        mock_client_cls.return_value = mock_client

        mock_write.return_value = 3

        event = {"zip_codes": ["90210"]}
        result = lambda_handler(event, None)

        assert "90210" in result["results"]
        assert result["zips_processed"] == 1

    def test_raises_without_table_name(self, monkeypatch):
        monkeypatch.setenv("RAPIDAPI_KEY", "test-key")
        monkeypatch.delenv("HOME_TABLE_NAME", raising=False)

        with pytest.raises(ValueError, match="HOME_TABLE_NAME"):
            lambda_handler({}, None)

    @patch("pipeline.handler.ZillowClient")
    def test_raises_without_api_key(self, mock_client_cls, monkeypatch):
        monkeypatch.setenv("HOME_TABLE_NAME", "Home-test")
        monkeypatch.delenv("RAPIDAPI_KEY", raising=False)

        mock_client_cls.side_effect = ValueError("RAPIDAPI_KEY is required")

        with pytest.raises(ValueError, match="RAPIDAPI_KEY"):
            lambda_handler({}, None)

    @patch("pipeline.handler._write_to_dynamo")
    @patch("pipeline.handler.ZillowClient")
    def test_budget_guard_stops_processing(self, mock_client_cls, mock_write, monkeypatch):
        monkeypatch.setenv("RAPIDAPI_KEY", "test-key")
        monkeypatch.setenv("HOME_TABLE_NAME", "Home-test")

        mock_client = MagicMock()
        mock_client.search_listings.return_value = MOCK_API_RESPONSE
        # Simulate budget already exhausted
        mock_client.request_count = 100
        mock_client_cls.return_value = mock_client

        mock_write.return_value = 0

        result = lambda_handler({"zip_codes": ["46220", "46205", "46202"]}, None)

        # Should stop before processing any zips since budget is exhausted
        assert result["zips_processed"] == 0

    @patch("pipeline.handler._write_to_dynamo")
    @patch("pipeline.handler.ZillowClient")
    def test_returns_total_deals_written(self, mock_client_cls, mock_write, monkeypatch):
        monkeypatch.setenv("RAPIDAPI_KEY", "test-key")
        monkeypatch.setenv("HOME_TABLE_NAME", "Home-test")

        mock_client = MagicMock()
        mock_client.search_listings.return_value = MOCK_API_RESPONSE
        mock_client.request_count = 0
        mock_client_cls.return_value = mock_client

        mock_write.return_value = 10

        result = lambda_handler({"zip_codes": ["46220"]}, None)

        assert result["total_deals_written"] == 10
