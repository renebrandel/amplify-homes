"""
Tests for scraper.main — CLI output formatting and CSV export.

Tests print_listing(), export_csv(), and letter grade assignment.
The main() function is not tested here since it orchestrates API calls;
its components are tested individually in test_scoring and test_zillow_client.
"""

import csv
import os
import tempfile
import pytest

from scraper.scoring import Listing, score_listings
from scraper.main import print_listing, export_csv


def _make_scored_listing(**overrides) -> Listing:
    """Helper to create a scored listing with sensible defaults."""
    defaults = dict(
        zpid="99999",
        address="123 Test St, Indianapolis, IN 46220",
        price=250000,
        zestimate=280000,
        sqft=1500,
        bedrooms=3,
        bathrooms=2.0,
        property_type="SINGLE_FAMILY",
        days_on_market=45,
        price_reduction=5000,
        year_built=1960,
        url="https://www.zillow.com/homedetails/99999_zpid/",
        image_url="https://example.com/img.jpg",
    )
    defaults.update(overrides)
    listing = Listing(**defaults)
    # Score it so it has breakdown
    scored = score_listings([listing])
    return scored[0]


# ═══════════════════════════════════════════════════════════════════
#  print_listing()
# ═══════════════════════════════════════════════════════════════════

class TestPrintListing:
    """Tests for terminal output formatting."""

    def test_prints_without_error(self, capsys):
        listing = _make_scored_listing()
        print_listing(1, listing)
        output = capsys.readouterr().out
        assert "#1" in output
        assert "123 Test St" in output

    def test_shows_price_and_sqft(self, capsys):
        listing = _make_scored_listing()
        print_listing(1, listing)
        output = capsys.readouterr().out
        assert "$250,000" in output
        assert "1,500 sqft" in output
        assert "3bd/2.0ba" in output

    def test_shows_zestimate_when_present(self, capsys):
        listing = _make_scored_listing(zestimate=300000)
        print_listing(1, listing)
        output = capsys.readouterr().out
        assert "Zestimate" in output
        assert "$300,000" in output

    def test_hides_zestimate_when_zero(self, capsys):
        listing = _make_scored_listing(zestimate=0)
        print_listing(1, listing)
        output = capsys.readouterr().out
        assert "Zestimate" not in output

    def test_shows_price_reduction(self, capsys):
        listing = _make_scored_listing(price_reduction=15000)
        print_listing(1, listing)
        output = capsys.readouterr().out
        assert "Price cut" in output
        assert "$15,000" in output

    def test_shows_score_breakdown(self, capsys):
        listing = _make_scored_listing()
        print_listing(1, listing)
        output = capsys.readouterr().out
        assert "comps:" in output
        assert "zest:" in output
        assert "DOM:" in output
        assert "reduction:" in output

    def test_shows_zillow_url(self, capsys):
        listing = _make_scored_listing()
        print_listing(1, listing)
        output = capsys.readouterr().out
        assert "zillow.com" in output


class TestLetterGrades:
    """Tests for letter grade assignment based on deal score."""

    def _get_grade(self, score, capsys):
        listing = _make_scored_listing()
        listing.deal_score = score
        print_listing(1, listing)
        return capsys.readouterr().out

    def test_grade_a_plus(self, capsys):
        assert "[A+]" in self._get_grade(75, capsys)

    def test_grade_a(self, capsys):
        assert "[A]" in self._get_grade(60, capsys)

    def test_grade_b_plus(self, capsys):
        assert "[B+]" in self._get_grade(50, capsys)

    def test_grade_b(self, capsys):
        assert "[B]" in self._get_grade(40, capsys)

    def test_grade_c_plus(self, capsys):
        assert "[C+]" in self._get_grade(30, capsys)

    def test_grade_c(self, capsys):
        assert "[C]" in self._get_grade(20, capsys)

    def test_grade_d(self, capsys):
        assert "[D]" in self._get_grade(5, capsys)


# ═══════════════════════════════════════════════════════════════════
#  export_csv()
# ═══════════════════════════════════════════════════════════════════

class TestExportCsv:
    """Tests for CSV file export."""

    def test_creates_csv_file(self, tmp_path):
        filepath = str(tmp_path / "deals.csv")
        listings = [_make_scored_listing()]
        export_csv(listings, filepath)
        assert os.path.exists(filepath)

    def test_csv_has_header_row(self, tmp_path):
        filepath = str(tmp_path / "deals.csv")
        listings = [_make_scored_listing()]
        export_csv(listings, filepath)

        with open(filepath) as f:
            reader = csv.reader(f)
            header = next(reader)
        assert "rank" in header
        assert "deal_score" in header
        assert "address" in header
        assert "price" in header
        assert "score_comps" in header

    def test_csv_has_correct_row_count(self, tmp_path):
        filepath = str(tmp_path / "deals.csv")
        listings = [
            _make_scored_listing(zpid="1"),
            _make_scored_listing(zpid="2"),
            _make_scored_listing(zpid="3"),
        ]
        export_csv(listings, filepath)

        with open(filepath) as f:
            reader = csv.reader(f)
            rows = list(reader)
        # 1 header + 3 data rows
        assert len(rows) == 4

    def test_csv_data_matches_listing(self, tmp_path):
        filepath = str(tmp_path / "deals.csv")
        listing = _make_scored_listing(
            zpid="42",
            address="999 Export Ave",
            price=350000,
        )
        export_csv([listing], filepath)

        with open(filepath) as f:
            reader = csv.DictReader(f)
            row = next(reader)

        assert row["address"] == "999 Export Ave"
        assert float(row["price"]) == 350000.0
        assert row["rank"] == "1"

    def test_csv_empty_listings(self, tmp_path):
        filepath = str(tmp_path / "empty.csv")
        export_csv([], filepath)

        with open(filepath) as f:
            reader = csv.reader(f)
            rows = list(reader)
        # Header only, no data rows
        assert len(rows) == 1

    def test_csv_includes_score_breakdown(self, tmp_path):
        filepath = str(tmp_path / "deals.csv")
        listing = _make_scored_listing()
        export_csv([listing], filepath)

        with open(filepath) as f:
            reader = csv.DictReader(f)
            row = next(reader)

        assert "score_comps" in row
        assert "score_zestimate" in row
        assert "score_dom" in row
        assert "score_reduction" in row
        # All should be numeric
        assert float(row["score_comps"]) >= 0
