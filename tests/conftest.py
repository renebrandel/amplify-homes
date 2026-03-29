"""
Shared test fixtures — mock API responses and pre-built Listing objects.

These fixtures mirror real Zillow API response shapes so tests exercise
the actual parsing/scoring logic without hitting the network.
"""

import pytest

from scraper.scoring import Listing


# ─── Mock Zillow API response ────────────────────────────────────────
# Mirrors the structure returned by zillow-com1 propertyExtendedSearch

MOCK_API_RESPONSE = {
    "totalResultCount": 5,
    "totalPages": 1,
    "props": [
        {
            "zpid": "100001",
            "address": "100 Broad Ripple Ave, Indianapolis, IN 46220",
            "price": 300000,
            "zestimate": 340000,
            "livingArea": 2000,
            "bedrooms": 3,
            "bathrooms": 2.0,
            "propertyType": "SINGLE_FAMILY",
            "daysOnZillow": 45,
            "priceReduction": 10000,
            "lotAreaValue": 5000,
            "yearBuilt": 1955,
            "imgSrc": "https://example.com/img1.jpg",
        },
        {
            "zpid": "100002",
            "address": "200 College Ave, Indianapolis, IN 46220",
            "price": 250000,
            "zestimate": 260000,
            "livingArea": 1500,
            "bedrooms": 3,
            "bathrooms": 1.5,
            "propertyType": "SINGLE_FAMILY",
            "daysOnZillow": 120,
            "priceReduction": "$15,000 (Feb 10)",
            "lotAreaValue": 4500,
            "yearBuilt": 1948,
            "imgSrc": "https://example.com/img2.jpg",
        },
        {
            "zpid": "100003",
            "address": "300 Guilford Ave, Indianapolis, IN 46220",
            "price": 400000,
            "zestimate": 390000,
            "livingArea": 2200,
            "bedrooms": 4,
            "bathrooms": 2.5,
            "propertyType": "SINGLE_FAMILY",
            "daysOnZillow": 10,
            "priceReduction": None,
            "lotAreaValue": 6000,
            "yearBuilt": 1965,
            "imgSrc": "https://example.com/img3.jpg",
        },
        {
            # Condo — different property type, separate comp group
            "zpid": "100004",
            "address": "400 Meridian St #2B, Indianapolis, IN 46220",
            "price": 180000,
            "zestimate": 200000,
            "livingArea": 900,
            "bedrooms": 2,
            "bathrooms": 1.0,
            "propertyType": "CONDO",
            "daysOnZillow": 60,
            "priceReduction": 5000,
            "lotAreaValue": 0,
            "yearBuilt": 2005,
            "imgSrc": "https://example.com/img4.jpg",
        },
        {
            # Should be skipped — missing price
            "zpid": "100005",
            "address": "500 Invalid Rd",
            "price": 0,
            "livingArea": 1200,
            "bedrooms": 2,
            "bathrooms": 1.0,
            "propertyType": "SINGLE_FAMILY",
        },
    ],
}

MOCK_API_RESPONSE_PAGE2 = {
    "totalResultCount": 5,
    "totalPages": 2,
    "props": [
        {
            "zpid": "100006",
            "address": "600 Kessler Blvd, Indianapolis, IN 46220",
            "price": 350000,
            "zestimate": 370000,
            "livingArea": 1800,
            "bedrooms": 3,
            "bathrooms": 2.0,
            "propertyType": "SINGLE_FAMILY",
            "daysOnZillow": 30,
            "priceReduction": None,
            "lotAreaValue": 7000,
            "yearBuilt": 1940,
            "imgSrc": "https://example.com/img6.jpg",
        },
    ],
}

MOCK_EMPTY_RESPONSE = {
    "totalResultCount": 0,
    "totalPages": 0,
    "props": [],
}


@pytest.fixture
def mock_api_response():
    """Full mock API response with 5 listings (1 invalid)."""
    return MOCK_API_RESPONSE.copy()


@pytest.fixture
def mock_empty_response():
    """Empty API response — no listings."""
    return MOCK_EMPTY_RESPONSE.copy()


@pytest.fixture
def sample_listings():
    """Pre-built list of Listing objects for scoring tests."""
    return [
        Listing(
            zpid="100001",
            address="100 Broad Ripple Ave",
            price=300000,
            zestimate=340000,
            sqft=2000,
            bedrooms=3,
            bathrooms=2.0,
            property_type="SINGLE_FAMILY",
            days_on_market=45,
            price_reduction=10000,
            year_built=1955,
        ),
        Listing(
            zpid="100002",
            address="200 College Ave",
            price=250000,
            zestimate=260000,
            sqft=1500,
            bedrooms=3,
            bathrooms=1.5,
            property_type="SINGLE_FAMILY",
            days_on_market=120,
            price_reduction=15000,
            year_built=1948,
        ),
        Listing(
            zpid="100003",
            address="300 Guilford Ave",
            price=400000,
            zestimate=390000,
            sqft=2200,
            bedrooms=4,
            bathrooms=2.5,
            property_type="SINGLE_FAMILY",
            days_on_market=10,
            price_reduction=0,
            year_built=1965,
        ),
    ]
