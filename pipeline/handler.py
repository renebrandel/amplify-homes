"""
AWS Lambda handler — scrapes listings for each configured zip code,
scores them, and writes deals to DynamoDB.

Triggered by EventBridge on a daily schedule (configured in template.yaml).

Environment variables (set in SAM template):
    RAPIDAPI_KEY    — RapidAPI key for Zillow API access
    HOME_TABLE_NAME — DynamoDB table name (AppSync Home table)
"""

import json
import logging
import os
from datetime import datetime, timezone

import boto3
from boto3.dynamodb.types import TypeSerializer

from scraper.zillow_client import ZillowClient
from scraper.scoring import parse_listings, score_listings

from pipeline.config import (
    TARGET_ZIPS,
    MIN_SCORE_TO_STORE,
    MAX_API_CALLS_PER_RUN,
)

logger = logging.getLogger()
logger.setLevel(logging.INFO)

serializer = TypeSerializer()


def _listing_to_dynamo_item(listing, zip_code: str) -> dict:
    """
    Convert a scored Listing dataclass into a DynamoDB item dict.

    Uses the Zillow zpid as the partition key so repeated runs
    overwrite stale data rather than creating duplicates.
    """
    now = datetime.now(timezone.utc).isoformat()

    return {
        "id": {"S": listing.zpid},
        "zpid": {"S": listing.zpid},
        "address": {"S": listing.address},
        "price": {"N": str(listing.price)},
        "zestimate": {"N": str(listing.zestimate)},
        "sqft": {"N": str(listing.sqft)},
        "pricePerSqft": {"N": str(round(listing.price_per_sqft, 2))},
        "bedrooms": {"N": str(listing.bedrooms)},
        "bathrooms": {"N": str(listing.bathrooms)},
        "propertyType": {"S": listing.property_type},
        "daysOnMarket": {"N": str(listing.days_on_market)},
        "priceReduction": {"N": str(listing.price_reduction)},
        "lotSqft": {"N": str(listing.lot_sqft)},
        "yearBuilt": {"N": str(listing.year_built)},
        "dealScore": {"N": str(listing.deal_score)},
        "scoreBreakdown": {"S": json.dumps(listing.score_breakdown)},
        "imageUrl": {"S": listing.image_url},
        "zillowUrl": {"S": listing.url},
        "zipCode": {"S": zip_code},
        "lastScraped": {"S": now},
        # AppSync metadata fields
        "__typename": {"S": "Home"},
        "createdAt": {"S": now},
        "updatedAt": {"S": now},
    }


def _scrape_zip(client: ZillowClient, zip_code: str) -> list:
    """
    Scrape and score listings for a single zip code.
    Returns scored listings sorted by deal_score descending.
    """
    logger.info(f"Scraping zip {zip_code}...")

    raw = client.search_listings(zip_code)
    total = raw.get("totalResultCount", 0)
    logger.info(f"  {zip_code}: {total} total results from API")

    listings = parse_listings(raw)
    logger.info(f"  {zip_code}: {len(listings)} listings with valid price & sqft")

    # Fetch page 2 if available and we have API budget
    total_pages = raw.get("totalPages", 1)
    if total_pages > 1 and client.request_count < MAX_API_CALLS_PER_RUN:
        raw2 = client.search_listings(zip_code, page=2)
        page2 = parse_listings(raw2)
        listings.extend(page2)
        logger.info(f"  {zip_code}: +{len(page2)} from page 2, total {len(listings)}")

    if not listings:
        logger.warning(f"  {zip_code}: No valid listings found, skipping")
        return []

    scored = score_listings(listings)
    deals = [l for l in scored if l.deal_score >= MIN_SCORE_TO_STORE]
    logger.info(f"  {zip_code}: {len(deals)} listings scored >= {MIN_SCORE_TO_STORE}")

    return deals


def _write_to_dynamo(table_name: str, listings: list, zip_code: str) -> int:
    """
    Batch-write scored listings to DynamoDB.
    Uses put_item with zpid as key, so re-runs overwrite stale data.
    Returns the number of items written.
    """
    dynamodb = boto3.client("dynamodb")
    written = 0

    # DynamoDB BatchWriteItem handles up to 25 items at a time
    batch = []
    for listing in listings:
        item = _listing_to_dynamo_item(listing, zip_code)
        batch.append({"PutRequest": {"Item": item}})

        if len(batch) == 25:
            dynamodb.batch_write_item(RequestItems={table_name: batch})
            written += len(batch)
            batch = []

    # Write remaining items
    if batch:
        dynamodb.batch_write_item(RequestItems={table_name: batch})
        written += len(batch)

    return written


def lambda_handler(event, context):
    """
    Lambda entry point. Triggered by EventBridge on a schedule.

    Event structure (EventBridge scheduled event):
        {
            "source": "aws.events",
            "detail-type": "Scheduled Event",
            ...
        }

    You can also invoke manually with a custom event to override zips:
        { "zip_codes": ["46220", "46205"] }

    Returns a summary dict with counts per zip code.
    """
    # Allow manual invocation with custom zip list
    zip_codes = event.get("zip_codes", TARGET_ZIPS)
    table_name = os.environ.get("HOME_TABLE_NAME", "")

    if not table_name:
        raise ValueError("HOME_TABLE_NAME environment variable is not set")

    logger.info(f"Pipeline starting: {len(zip_codes)} zips, table={table_name}")

    try:
        client = ZillowClient()
    except ValueError as e:
        logger.error(f"Failed to initialize Zillow client: {e}")
        raise

    results = {}

    for zip_code in zip_codes:
        # Budget guard — stop if we've used too many API calls
        if client.request_count >= MAX_API_CALLS_PER_RUN:
            logger.warning(
                f"API budget exhausted ({client.request_count} calls). "
                f"Skipping remaining zips."
            )
            break

        deals = _scrape_zip(client, zip_code)

        if deals:
            written = _write_to_dynamo(table_name, deals, zip_code)
            results[zip_code] = {"scraped": len(deals), "written": written}
            logger.info(f"  {zip_code}: wrote {written} items to DynamoDB")
        else:
            results[zip_code] = {"scraped": 0, "written": 0}

    summary = {
        "status": "complete",
        "api_calls_used": client.request_count,
        "zips_processed": len(results),
        "results": results,
        "total_deals_written": sum(r["written"] for r in results.values()),
    }

    logger.info(f"Pipeline complete: {json.dumps(summary)}")
    return summary
