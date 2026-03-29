"""
Tests for scraper.scoring — parsing, grouping, and deal scoring.

Covers:
  - Listing dataclass construction and price_per_sqft auto-calc
  - parse_listings() — API response parsing, filtering invalid entries
  - _parse_price_reduction() — string format handling
  - _group_key() — comp group keying
  - score_listings() — full scoring pipeline with all 4 factors
  - Edge cases: empty input, single listing, zero values
"""

import pytest

from scraper.scoring import (
    Listing,
    parse_listings,
    score_listings,
    _parse_price_reduction,
    _group_key,
)


# ═══════════════════════════════════════════════════════════════════
#  Listing dataclass
# ═══════════════════════════════════════════════════════════════════

class TestListing:
    """Tests for the Listing dataclass and its __post_init__ logic."""

    def test_price_per_sqft_calculated_on_init(self):
        listing = Listing(price=300000, sqft=2000)
        assert listing.price_per_sqft == 150.0

    def test_price_per_sqft_zero_when_no_sqft(self):
        listing = Listing(price=300000, sqft=0)
        assert listing.price_per_sqft == 0.0

    def test_price_per_sqft_zero_when_no_price(self):
        listing = Listing(price=0, sqft=2000)
        assert listing.price_per_sqft == 0.0

    def test_defaults_are_sensible(self):
        listing = Listing()
        assert listing.zpid == ""
        assert listing.deal_score == 0.0
        assert listing.score_breakdown == {}

    def test_url_can_be_set(self):
        listing = Listing(url="https://zillow.com/test")
        assert listing.url == "https://zillow.com/test"


# ═══════════════════════════════════════════════════════════════════
#  parse_listings()
# ═══════════════════════════════════════════════════════════════════

class TestParseListings:
    """Tests for converting raw API responses into Listing objects."""

    def test_parses_valid_listings(self, mock_api_response):
        listings = parse_listings(mock_api_response)
        # 5 props in fixture, but 1 has price=0 → should get 4
        assert len(listings) == 4

    def test_skips_zero_price(self, mock_api_response):
        listings = parse_listings(mock_api_response)
        zpids = [l.zpid for l in listings]
        assert "100005" not in zpids  # price=0, should be filtered

    def test_skips_zero_sqft(self):
        response = {
            "props": [{"zpid": "1", "price": 100000, "livingArea": 0}]
        }
        assert parse_listings(response) == []

    def test_parses_fields_correctly(self, mock_api_response):
        listings = parse_listings(mock_api_response)
        first = next(l for l in listings if l.zpid == "100001")

        assert first.address == "100 Broad Ripple Ave, Indianapolis, IN 46220"
        assert first.price == 300000.0
        assert first.zestimate == 340000.0
        assert first.sqft == 2000.0
        assert first.bedrooms == 3
        assert first.bathrooms == 2.0
        assert first.property_type == "SINGLE_FAMILY"
        assert first.days_on_market == 45
        assert first.year_built == 1955
        assert first.price_per_sqft == 150.0

    def test_generates_zillow_url(self, mock_api_response):
        listings = parse_listings(mock_api_response)
        first = listings[0]
        assert "homedetails" in first.url
        assert first.zpid in first.url

    def test_handles_string_price_reduction(self, mock_api_response):
        listings = parse_listings(mock_api_response)
        # zpid 100002 has priceReduction as "$15,000 (Feb 10)"
        listing = next(l for l in listings if l.zpid == "100002")
        assert listing.price_reduction == 15000.0

    def test_handles_numeric_price_reduction(self, mock_api_response):
        listings = parse_listings(mock_api_response)
        # zpid 100001 has priceReduction as integer 10000
        listing = next(l for l in listings if l.zpid == "100001")
        assert listing.price_reduction == 10000.0

    def test_handles_null_price_reduction(self, mock_api_response):
        listings = parse_listings(mock_api_response)
        # zpid 100003 has priceReduction as None
        listing = next(l for l in listings if l.zpid == "100003")
        assert listing.price_reduction == 0.0

    def test_empty_response_returns_empty_list(self, mock_empty_response):
        assert parse_listings(mock_empty_response) == []

    def test_missing_props_key_returns_empty_list(self):
        assert parse_listings({}) == []
        assert parse_listings({"props": None}) == []

    def test_handles_missing_optional_fields(self):
        response = {
            "props": [
                {"zpid": "1", "price": 200000, "livingArea": 1000}
            ]
        }
        listings = parse_listings(response)
        assert len(listings) == 1
        assert listings[0].zestimate == 0.0
        assert listings[0].bedrooms == 0
        assert listings[0].year_built == 0
        assert listings[0].property_type == "UNKNOWN"


# ═══════════════════════════════════════════════════════════════════
#  _parse_price_reduction()
# ═══════════════════════════════════════════════════════════════════

class TestParsePriceReduction:
    """Tests for the price reduction string parser."""

    def test_parses_dollar_format(self):
        assert _parse_price_reduction("$5,000 (Jan 15)") == 5000.0

    def test_parses_without_dollar_sign(self):
        assert _parse_price_reduction("10,000") == 10000.0

    def test_parses_simple_number(self):
        assert _parse_price_reduction("$25000") == 25000.0

    def test_returns_zero_for_none(self):
        assert _parse_price_reduction(None) == 0.0

    def test_returns_zero_for_empty_string(self):
        assert _parse_price_reduction("") == 0.0

    def test_returns_zero_for_non_string(self):
        assert _parse_price_reduction(12345) == 0.0

    def test_returns_zero_for_no_numbers(self):
        assert _parse_price_reduction("no price here") == 0.0


# ═══════════════════════════════════════════════════════════════════
#  _group_key()
# ═══════════════════════════════════════════════════════════════════

class TestGroupKey:
    """Tests for comp group key generation."""

    def test_groups_by_type_and_bedrooms(self):
        listing = Listing(property_type="SINGLE_FAMILY", bedrooms=3)
        assert _group_key(listing) == "SINGLE_FAMILY_3bd"

    def test_different_types_different_keys(self):
        sf = Listing(property_type="SINGLE_FAMILY", bedrooms=3)
        condo = Listing(property_type="CONDO", bedrooms=3)
        assert _group_key(sf) != _group_key(condo)

    def test_different_bedrooms_different_keys(self):
        three_bed = Listing(property_type="SINGLE_FAMILY", bedrooms=3)
        four_bed = Listing(property_type="SINGLE_FAMILY", bedrooms=4)
        assert _group_key(three_bed) != _group_key(four_bed)


# ═══════════════════════════════════════════════════════════════════
#  score_listings()
# ═══════════════════════════════════════════════════════════════════

class TestScoreListings:
    """Tests for the full scoring pipeline."""

    def test_returns_empty_for_empty_input(self):
        assert score_listings([]) == []

    def test_all_listings_get_scores(self, sample_listings):
        scored = score_listings(sample_listings)
        for listing in scored:
            assert listing.deal_score >= 0
            assert listing.deal_score <= 100

    def test_sorted_by_score_descending(self, sample_listings):
        scored = score_listings(sample_listings)
        scores = [l.deal_score for l in scored]
        assert scores == sorted(scores, reverse=True)

    def test_score_breakdown_has_all_four_factors(self, sample_listings):
        scored = score_listings(sample_listings)
        for listing in scored:
            bd = listing.score_breakdown
            assert "price_vs_comps" in bd
            assert "below_zestimate" in bd
            assert "days_on_market" in bd
            assert "price_reduction" in bd

    def test_score_is_sum_of_breakdown(self, sample_listings):
        scored = score_listings(sample_listings)
        for listing in scored:
            bd = listing.score_breakdown
            expected = sum(bd.values())
            assert abs(listing.deal_score - expected) < 0.2  # rounding tolerance

    def test_max_possible_score_is_100(self):
        """A listing that maxes out every factor should score 100."""
        listings = [
            # The "market" listing — sets the median
            Listing(
                zpid="median",
                price=200000,
                sqft=1000,
                bedrooms=3,
                property_type="SINGLE_FAMILY",
                zestimate=200000,
                days_on_market=0,
                price_reduction=0,
            ),
            # The "deal" listing — way below on everything
            Listing(
                zpid="deal",
                price=100000,          # 50% below median $/sqft
                sqft=1000,
                bedrooms=3,
                property_type="SINGLE_FAMILY",
                zestimate=200000,      # 50% below zestimate
                days_on_market=200,    # well over 90 days
                price_reduction=10000, # ~9% reduction
            ),
        ]
        scored = score_listings(listings)
        deal = next(l for l in scored if l.zpid == "deal")
        assert deal.deal_score == 100.0

    def test_at_median_scores_zero_for_comps(self):
        """A listing exactly at the group median should get 0 for comps."""
        listings = [
            Listing(zpid="a", price=200000, sqft=1000, bedrooms=3,
                    property_type="SF", zestimate=0, days_on_market=0),
        ]
        scored = score_listings(listings)
        # Single listing = it IS the median, so 0% below
        assert scored[0].score_breakdown["price_vs_comps"] == 0.0

    def test_above_zestimate_scores_zero(self):
        """Listed above Zestimate → 0 points for zestimate factor."""
        listings = [
            Listing(zpid="overpriced", price=300000, sqft=1000, bedrooms=3,
                    property_type="SF", zestimate=250000, days_on_market=0),
        ]
        scored = score_listings(listings)
        assert scored[0].score_breakdown["below_zestimate"] == 0.0

    def test_no_zestimate_scores_zero(self):
        """Missing Zestimate → 0 points for zestimate factor."""
        listings = [
            Listing(zpid="no_zest", price=200000, sqft=1000, bedrooms=3,
                    property_type="SF", zestimate=0, days_on_market=0),
        ]
        scored = score_listings(listings)
        assert scored[0].score_breakdown["below_zestimate"] == 0.0

    def test_dom_scoring_linear_scale(self):
        """Days on market should scale linearly up to 90 days = 20 pts."""
        listings = [
            Listing(zpid="45d", price=200000, sqft=1000, bedrooms=3,
                    property_type="SF", days_on_market=45, zestimate=0),
        ]
        scored = score_listings(listings)
        dom_score = scored[0].score_breakdown["days_on_market"]
        # 45/90 * 20 = 10.0
        assert dom_score == 10.0

    def test_dom_caps_at_90_days(self):
        """DOM over 90 days should still max at 20 pts."""
        listings = [
            Listing(zpid="200d", price=200000, sqft=1000, bedrooms=3,
                    property_type="SF", days_on_market=200, zestimate=0),
        ]
        scored = score_listings(listings)
        assert scored[0].score_breakdown["days_on_market"] == 20.0

    def test_separate_comp_groups(self):
        """Different property types should be scored against their own group."""
        listings = [
            # Expensive SF — but it's the only SF, so it's at its own median
            Listing(zpid="sf1", price=500000, sqft=2000, bedrooms=3,
                    property_type="SINGLE_FAMILY", zestimate=0, days_on_market=0),
            # Cheap condo — only condo, so at its own median
            Listing(zpid="condo1", price=100000, sqft=800, bedrooms=2,
                    property_type="CONDO", zestimate=0, days_on_market=0),
        ]
        scored = score_listings(listings)
        # Both are sole members of their group → both score 0 for comps
        for listing in scored:
            assert listing.score_breakdown["price_vs_comps"] == 0.0

    def test_cheaper_listing_in_group_scores_higher_on_comps(self):
        """Within a comp group, the cheaper-per-sqft listing should score higher."""
        listings = [
            Listing(zpid="expensive", price=300000, sqft=1000, bedrooms=3,
                    property_type="SF", zestimate=0, days_on_market=0),
            Listing(zpid="cheap", price=200000, sqft=1000, bedrooms=3,
                    property_type="SF", zestimate=0, days_on_market=0),
        ]
        scored = score_listings(listings)
        cheap = next(l for l in scored if l.zpid == "cheap")
        expensive = next(l for l in scored if l.zpid == "expensive")
        assert cheap.score_breakdown["price_vs_comps"] > expensive.score_breakdown["price_vs_comps"]
