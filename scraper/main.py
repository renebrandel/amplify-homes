#!/usr/bin/env python3
"""
Amplify Homes — Real Estate Comp Scraper
=========================================
Finds undervalued active listings in a zip code by scoring them
against comparable properties (same type + bedroom count).

Usage:
    export RAPIDAPI_KEY="your-key-here"
    python -m scraper.main                      # defaults to 46220
    python -m scraper.main --zip 46220 --top 10
    python -m scraper.main --zip 46220 --csv results.csv
"""

import argparse
import csv
import sys

from scraper.zillow_client import ZillowClient
from scraper.scoring import parse_listings, score_listings


HEADER = """
╔══════════════════════════════════════════════════════════════╗
║           AMPLIFY HOMES — DEAL FINDER                       ║
║           Zip: {zip_code}  |  Active Listings                    ║
╚══════════════════════════════════════════════════════════════╝
"""


def print_listing(rank: int, l) -> None:
    """Pretty-print a single scored listing to the terminal."""
    grade = "A+" if l.deal_score >= 70 else \
            "A"  if l.deal_score >= 55 else \
            "B+" if l.deal_score >= 45 else \
            "B"  if l.deal_score >= 35 else \
            "C+" if l.deal_score >= 25 else \
            "C"  if l.deal_score >= 15 else "D"

    print(f"\n{'─' * 62}")
    print(f"  #{rank}  [{grade}]  Score: {l.deal_score}/100")
    print(f"  {l.address}")
    print(f"  Price: ${l.price:,.0f}   |   {l.bedrooms}bd/{l.bathrooms}ba   |   {l.sqft:,.0f} sqft")
    print(f"  $/sqft: ${l.price_per_sqft:,.0f}", end="")
    if l.zestimate > 0:
        diff = l.zestimate - l.price
        print(f"   |   Zestimate: ${l.zestimate:,.0f} ({'+' if diff >= 0 else ''}{diff:,.0f})", end="")
    print()
    if l.days_on_market:
        print(f"  Days on market: {l.days_on_market}", end="")
    if l.price_reduction > 0:
        print(f"   |   Price cut: ${l.price_reduction:,.0f}", end="")
    if l.year_built:
        print(f"   |   Built: {l.year_built}", end="")
    print()

    # Score breakdown
    bd = l.score_breakdown
    print(f"  Scores → comps: {bd.get('price_vs_comps', 0)}/40"
          f"  zest: {bd.get('below_zestimate', 0)}/25"
          f"  DOM: {bd.get('days_on_market', 0)}/20"
          f"  reduction: {bd.get('price_reduction', 0)}/15")
    print(f"  {l.url}")


def export_csv(listings, filepath: str) -> None:
    """Export scored listings to a CSV file."""
    with open(filepath, "w", newline="") as f:
        writer = csv.writer(f)
        writer.writerow([
            "rank", "deal_score", "address", "price", "zestimate",
            "sqft", "price_per_sqft", "bedrooms", "bathrooms",
            "property_type", "days_on_market", "price_reduction",
            "year_built", "url",
            "score_comps", "score_zestimate", "score_dom", "score_reduction",
        ])
        for i, l in enumerate(listings, 1):
            bd = l.score_breakdown
            writer.writerow([
                i, l.deal_score, l.address, l.price, l.zestimate,
                l.sqft, round(l.price_per_sqft, 2), l.bedrooms, l.bathrooms,
                l.property_type, l.days_on_market, l.price_reduction,
                l.year_built, l.url,
                bd.get("price_vs_comps", 0), bd.get("below_zestimate", 0),
                bd.get("days_on_market", 0), bd.get("price_reduction", 0),
            ])
    print(f"\nExported {len(listings)} listings to {filepath}")


def main():
    parser = argparse.ArgumentParser(description="Find undervalued real estate deals")
    parser.add_argument("--zip", default="46220", help="Zip code to search (default: 46220)")
    parser.add_argument("--top", type=int, default=15, help="Show top N deals (default: 15)")
    parser.add_argument("--csv", dest="csv_file", help="Export results to CSV file")
    parser.add_argument("--min-score", type=float, default=0, help="Only show listings above this score")
    args = parser.parse_args()

    print(HEADER.format(zip_code=args.zip))

    # Initialize client
    try:
        client = ZillowClient()
    except ValueError as e:
        print(f"Error: {e}", file=sys.stderr)
        sys.exit(1)

    # Fetch listings (1 API call per page — be conservative with 50/mo limit)
    print(f"Fetching active listings in {args.zip}...")
    raw = client.search_listings(args.zip)

    total_results = raw.get("totalResultCount", 0)
    print(f"  Found {total_results} total results")

    listings = parse_listings(raw)
    print(f"  Parsed {len(listings)} listings with valid price & sqft data")

    if not listings:
        print("\nNo listings found. Check your API key and zip code.")
        sys.exit(1)

    # If there are more pages and we have API budget, fetch page 2
    total_pages = raw.get("totalPages", 1)
    if total_pages > 1 and client.request_count < 5:
        print(f"  Fetching page 2 of {total_pages}...")
        raw2 = client.search_listings(args.zip, page=2)
        listings.extend(parse_listings(raw2))
        print(f"  Total listings: {len(listings)}")

    # Score
    print("\nScoring listings against comps...")
    scored = score_listings(listings)

    # Filter
    if args.min_score > 0:
        scored = [l for l in scored if l.deal_score >= args.min_score]

    top = scored[: args.top]

    # Summary stats
    if scored:
        avg_ppsf = sum(l.price_per_sqft for l in scored) / len(scored)
        avg_price = sum(l.price for l in scored) / len(scored)
        print(f"\n  Zip {args.zip} market snapshot:")
        print(f"    Avg list price:  ${avg_price:,.0f}")
        print(f"    Avg $/sqft:      ${avg_ppsf:,.0f}")
        print(f"    Listings scored: {len(scored)}")

    # Display top deals
    print(f"\n{'=' * 62}")
    print(f"  TOP {len(top)} DEALS")
    print(f"{'=' * 62}")
    for i, l in enumerate(top, 1):
        print_listing(i, l)

    print(f"\n{'─' * 62}")
    print(f"  API calls used this run: {client.request_count}")
    print(f"{'─' * 62}\n")

    # CSV export
    if args.csv_file:
        export_csv(scored, args.csv_file)


if __name__ == "__main__":
    main()
