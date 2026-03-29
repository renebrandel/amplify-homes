"""
Tests for scraper.zillow_client — API client initialization, request
building, retry logic, and rate limit handling.

All HTTP calls are mocked — no real API calls are made.
"""

import pytest
from unittest.mock import patch, MagicMock

from scraper.zillow_client import ZillowClient, RAPIDAPI_HOST, BASE_URL


# ═══════════════════════════════════════════════════════════════════
#  Client initialization
# ═══════════════════════════════════════════════════════════════════

class TestClientInit:
    """Tests for ZillowClient construction and API key handling."""

    def test_accepts_direct_api_key(self):
        client = ZillowClient(api_key="test-key-123")
        assert client.api_key == "test-key-123"

    def test_reads_api_key_from_env(self, monkeypatch):
        monkeypatch.setenv("RAPIDAPI_KEY", "env-key-456")
        client = ZillowClient()
        assert client.api_key == "env-key-456"

    def test_direct_key_takes_priority_over_env(self, monkeypatch):
        monkeypatch.setenv("RAPIDAPI_KEY", "env-key")
        client = ZillowClient(api_key="direct-key")
        assert client.api_key == "direct-key"

    def test_raises_without_api_key(self, monkeypatch):
        monkeypatch.delenv("RAPIDAPI_KEY", raising=False)
        with pytest.raises(ValueError, match="RAPIDAPI_KEY is required"):
            ZillowClient()

    def test_sets_correct_headers(self):
        client = ZillowClient(api_key="test-key")
        assert client.headers["x-rapidapi-key"] == "test-key"
        assert client.headers["x-rapidapi-host"] == RAPIDAPI_HOST

    def test_request_count_starts_at_zero(self):
        client = ZillowClient(api_key="test-key")
        assert client.request_count == 0

    def test_custom_host_via_env(self, monkeypatch):
        """RAPIDAPI_ZILLOW_HOST env var overrides the default API host."""
        monkeypatch.setenv("RAPIDAPI_ZILLOW_HOST", "zillow-working-api.p.rapidapi.com")
        # Re-import to pick up the env var change
        import importlib
        import scraper.zillow_client as mod
        importlib.reload(mod)
        try:
            assert mod.RAPIDAPI_HOST == "zillow-working-api.p.rapidapi.com"
            assert "zillow-working-api.p.rapidapi.com" in mod.BASE_URL
            client = mod.ZillowClient(api_key="test-key")
            assert client.headers["x-rapidapi-host"] == "zillow-working-api.p.rapidapi.com"
        finally:
            # Restore original module state
            monkeypatch.delenv("RAPIDAPI_ZILLOW_HOST", raising=False)
            importlib.reload(mod)


# ═══════════════════════════════════════════════════════════════════
#  search_listings()
# ═══════════════════════════════════════════════════════════════════

class TestSearchListings:
    """Tests for the search_listings method — parameter building and API calls."""

    @patch("scraper.zillow_client.requests.get")
    def test_calls_correct_endpoint(self, mock_get):
        mock_resp = MagicMock()
        mock_resp.status_code = 200
        mock_resp.json.return_value = {"props": []}
        mock_get.return_value = mock_resp

        client = ZillowClient(api_key="test-key")
        client.search_listings("46220")

        mock_get.assert_called_once()
        call_url = mock_get.call_args[0][0]
        assert call_url == f"{BASE_URL}/propertyExtendedSearch"

    @patch("scraper.zillow_client.requests.get")
    def test_passes_correct_params(self, mock_get):
        mock_resp = MagicMock()
        mock_resp.status_code = 200
        mock_resp.json.return_value = {"props": []}
        mock_get.return_value = mock_resp

        client = ZillowClient(api_key="test-key")
        client.search_listings("46220", page=2)

        params = mock_get.call_args[1]["params"]
        assert params["location"] == "46220"
        assert params["status_type"] == "forSale"
        assert params["page"] == "2"
        assert "Houses" in params["home_type"]

    @patch("scraper.zillow_client.requests.get")
    def test_increments_request_count(self, mock_get):
        mock_resp = MagicMock()
        mock_resp.status_code = 200
        mock_resp.json.return_value = {"props": []}
        mock_get.return_value = mock_resp

        client = ZillowClient(api_key="test-key")
        client.search_listings("46220")
        assert client.request_count == 1

        client.search_listings("46205")
        assert client.request_count == 2


# ═══════════════════════════════════════════════════════════════════
#  Retry and rate limit handling
# ═══════════════════════════════════════════════════════════════════

class TestRetryLogic:
    """Tests for the _get method's retry and rate limit behavior."""

    @patch("scraper.zillow_client.time.sleep")
    @patch("scraper.zillow_client.requests.get")
    def test_retries_on_429_rate_limit(self, mock_get, mock_sleep):
        rate_limited = MagicMock()
        rate_limited.status_code = 429

        success = MagicMock()
        success.status_code = 200
        success.json.return_value = {"props": []}

        mock_get.side_effect = [rate_limited, success]

        client = ZillowClient(api_key="test-key")
        result = client.search_listings("46220")

        assert result == {"props": []}
        assert mock_get.call_count == 2
        mock_sleep.assert_called()  # should have waited before retry

    @patch("scraper.zillow_client.time.sleep")
    @patch("scraper.zillow_client.requests.get")
    def test_retries_on_request_exception(self, mock_get, mock_sleep):
        import requests as req

        mock_get.side_effect = [
            req.exceptions.ConnectionError("connection failed"),
            MagicMock(status_code=200, json=lambda: {"props": []}),
        ]

        client = ZillowClient(api_key="test-key")
        result = client.search_listings("46220")

        assert result == {"props": []}
        assert mock_get.call_count == 2

    @patch("scraper.zillow_client.time.sleep")
    @patch("scraper.zillow_client.requests.get")
    def test_raises_after_max_retries(self, mock_get, mock_sleep):
        import requests as req

        mock_get.side_effect = req.exceptions.ConnectionError("persistent failure")

        client = ZillowClient(api_key="test-key")
        with pytest.raises(req.exceptions.ConnectionError):
            client.search_listings("46220")

        assert mock_get.call_count == 3  # initial + 2 retries

    @patch("scraper.zillow_client.requests.get")
    def test_raises_on_http_error(self, mock_get):
        import requests as req

        mock_resp = MagicMock()
        mock_resp.status_code = 403
        mock_resp.raise_for_status.side_effect = req.exceptions.HTTPError("Forbidden")
        mock_get.return_value = mock_resp

        client = ZillowClient(api_key="test-key")
        with pytest.raises(req.exceptions.HTTPError):
            client.search_listings("46220")


# ═══════════════════════════════════════════════════════════════════
#  Other endpoints
# ═══════════════════════════════════════════════════════════════════

class TestOtherEndpoints:
    """Tests for get_property_details and get_comps."""

    @patch("scraper.zillow_client.requests.get")
    def test_get_property_details_endpoint(self, mock_get):
        mock_resp = MagicMock()
        mock_resp.status_code = 200
        mock_resp.json.return_value = {"zpid": "12345"}
        mock_get.return_value = mock_resp

        client = ZillowClient(api_key="test-key")
        result = client.get_property_details("12345")

        call_url = mock_get.call_args[0][0]
        assert call_url == f"{BASE_URL}/property"
        assert mock_get.call_args[1]["params"] == {"zpid": "12345"}
        assert result == {"zpid": "12345"}

    @patch("scraper.zillow_client.requests.get")
    def test_get_comps_endpoint(self, mock_get):
        mock_resp = MagicMock()
        mock_resp.status_code = 200
        mock_resp.json.return_value = {"comps": []}
        mock_get.return_value = mock_resp

        client = ZillowClient(api_key="test-key")
        result = client.get_comps("12345")

        call_url = mock_get.call_args[0][0]
        assert call_url == f"{BASE_URL}/similarProperty"
        assert result == {"comps": []}
