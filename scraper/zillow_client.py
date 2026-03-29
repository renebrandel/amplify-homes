"""
Zillow RapidAPI client for fetching active listings.

Supports multiple Zillow API providers on RapidAPI. Set the
RAPIDAPI_ZILLOW_HOST env var to switch providers. Defaults to
'zillow-com1.p.rapidapi.com'. Compatible alternatives include:
  - zillow-com1.p.rapidapi.com          (original, may be discontinued)
  - real-time-zillow-data.p.rapidapi.com (by OpenWeb Ninja / letscrape)
  - zillow-working-api.p.rapidapi.com   (by oneapiproject)

All three expose the same endpoint names (propertyExtendedSearch, property,
similarProperty) with the same parameter/response format.
"""

import os
import time
import requests


RAPIDAPI_HOST = os.environ.get(
    "RAPIDAPI_ZILLOW_HOST", "zillow-com1.p.rapidapi.com"
)
BASE_URL = f"https://{RAPIDAPI_HOST}"


class ZillowClient:
    """Thin wrapper around the Zillow RapidAPI with rate-limit tracking."""

    def __init__(self, api_key: str | None = None):
        self.api_key = api_key or os.environ.get("RAPIDAPI_KEY", "")
        if not self.api_key:
            raise ValueError(
                "RAPIDAPI_KEY is required. Set it as an env var or pass it directly."
            )
        self.headers = {
            "x-rapidapi-key": self.api_key,
            "x-rapidapi-host": RAPIDAPI_HOST,
        }
        self.request_count = 0

    def _get(self, endpoint: str, params: dict) -> dict:
        """Make a GET request with basic retry on transient errors."""
        url = f"{BASE_URL}/{endpoint}"
        for attempt in range(3):
            try:
                resp = requests.get(url, headers=self.headers, params=params, timeout=30)
                self.request_count += 1
                if resp.status_code == 429:
                    wait = 2 ** (attempt + 1)
                    print(f"  Rate limited. Waiting {wait}s...")
                    time.sleep(wait)
                    continue
                resp.raise_for_status()
                return resp.json()
            except requests.exceptions.RequestException as e:
                if attempt == 2:
                    raise
                time.sleep(2 ** attempt)
        return {}

    def search_listings(self, zip_code: str, status: str = "forSale", page: int = 1) -> dict:
        """
        Search for property listings by zip code.
        Returns raw API response with listings and pagination info.
        """
        params = {
            "location": zip_code,
            "status_type": status,
            "home_type": "Houses,Condos,Townhomes,Multi-family",
            "sort": "newest",
            "page": str(page),
        }
        return self._get("propertyExtendedSearch", params)

    def get_property_details(self, zpid: str) -> dict:
        """Fetch detailed info for a single property. Costs 1 API call."""
        return self._get("property", {"zpid": zpid})

    def get_comps(self, zpid: str) -> dict:
        """Fetch comparable properties for a given zpid. Costs 1 API call."""
        return self._get("similarProperty", {"zpid": zpid})
