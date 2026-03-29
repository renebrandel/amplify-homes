# Real Estate Comp Scraper

A Python CLI tool that identifies undervalued active real estate listings by analyzing them against comparable properties in the same zip code. Built for investors and homebuyers looking for deals in the Indianapolis metro area (default: 46220 — Broad Ripple / Meridian-Kessler).

---

## Table of Contents

- [How It Works](#how-it-works)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Scoring Methodology](#scoring-methodology)
- [Understanding the Output](#understanding-the-output)
- [API Budget & Rate Limits](#api-budget--rate-limits)
- [Project Structure](#project-structure)
- [Troubleshooting](#troubleshooting)

---

## How It Works

The scraper follows a three-step pipeline:

1. **Fetch** — Pulls active for-sale listings from the Zillow RapidAPI for a given zip code. Retrieves houses, condos, townhomes, and multi-family properties.

2. **Group & Compare** — Groups listings into "comp buckets" by property type and bedroom count (e.g., all 3-bedroom single-family homes are compared against each other). This ensures a ranch isn't being compared to a condo. Calculates the **median price per square foot** for each group as the baseline.

3. **Score** — Assigns each listing a deal score from 0–100 based on four weighted factors (see [Scoring Methodology](#scoring-methodology)). Listings are ranked from best deal to worst.

---

## Prerequisites

- **Python 3.10+** (uses `match` type hints like `str | None`)
- **pip** (Python package manager)
- **RapidAPI account** with a subscription to a Zillow API provider (see [Configuration](#configuration) for supported providers)
  - The **Basic (free) tier** typically provides 50 requests/month, which is sufficient — each run uses only 1–2 API calls

---

## Installation

From the project root (`amplify-homes/`):

```bash
# Install Python dependencies
pip install -r scraper/requirements.txt
```

This installs:
- `requests` — HTTP client for API calls

---

## Configuration

| Variable | Required | Description |
|---|---|---|
| `RAPIDAPI_KEY` | Yes | Your RapidAPI key from [rapidapi.com/developer/dashboard](https://rapidapi.com/developer/dashboard) |
| `RAPIDAPI_ZILLOW_HOST` | No | API host to use (see table below). Defaults to `zillow-com1.p.rapidapi.com` |

### Supported API Providers

The scraper works with any Zillow RapidAPI provider that exposes the `propertyExtendedSearch`, `property`, and `similarProperty` endpoints. Known compatible providers:

| Host | Provider | Notes |
|---|---|---|
| `zillow-com1.p.rapidapi.com` | apimaker | Original default; may be discontinued |
| `real-time-zillow-data.p.rapidapi.com` | OpenWeb Ninja / letscrape | Actively maintained, free tier available |
| `zillow-working-api.p.rapidapi.com` | oneapiproject | Actively maintained |

If the default host returns 404 or is unavailable, subscribe to one of the alternatives on RapidAPI and set the host:

```bash
export RAPIDAPI_KEY="your-rapidapi-key-here"
export RAPIDAPI_ZILLOW_HOST="real-time-zillow-data.p.rapidapi.com"
```

Or create a `.env` file (not committed to git) and source it:

```bash
echo 'export RAPIDAPI_KEY="your-key"' > .env
echo 'export RAPIDAPI_ZILLOW_HOST="real-time-zillow-data.p.rapidapi.com"' >> .env
source .env
```

Alternatively, you can pass the key directly in Python:

```python
from scraper.zillow_client import ZillowClient
client = ZillowClient(api_key="your-key")
```

---

## Usage

All commands are run from the project root (`amplify-homes/`).

### Basic Run (defaults to zip 46220, top 15 results)

```bash
python -m scraper.main
```

### Command-Line Options

| Flag | Default | Description |
|---|---|---|
| `--zip` | `46220` | Zip code to search for active listings |
| `--top` | `15` | Number of top-scored deals to display |
| `--min-score` | `0` | Only show listings with a deal score at or above this threshold |
| `--csv` | *(none)* | Export all scored results to a CSV file |

### Examples

```bash
# Show the top 10 deals in zip 46220
python -m scraper.main --top 10

# Only show strong deals (score >= 30)
python -m scraper.main --min-score 30

# Export everything to a spreadsheet-friendly CSV
python -m scraper.main --csv deals.csv

# Search a different zip code
python -m scraper.main --zip 46205 --top 20

# Combine options
python -m scraper.main --zip 46220 --top 5 --min-score 25 --csv top_deals.csv
```

---

## Scoring Methodology

Each listing receives a **deal score from 0 to 100**. Higher scores indicate a potentially better deal. The score is composed of four weighted factors:

### 1. Price Per Square Foot vs. Comps — 40 points (heaviest weight)

This is the core of the comp analysis. Listings are grouped by **property type + bedroom count** (e.g., "SINGLE_FAMILY_3bd") and compared against the **median $/sqft** of that group.

- A listing priced **at the median** scores **0/40**
- A listing priced **20% or more below median** scores **40/40** (full marks)
- The scale is linear between 0% and 20% below median

**Why this matters:** Price per square foot normalizes for size differences and is the most reliable indicator of relative value within a comparable group.

### 2. Below Zestimate — 25 points

Compares the listing price against Zillow's **Zestimate** (their automated valuation model based on public data, recent sales, and tax assessments).

- Listed **at or above** Zestimate scores **0/25**
- Listed **15% or more below** Zestimate scores **25/25** (full marks)
- Linear scale between 0% and 15% below

**Why this matters:** A listing significantly below Zestimate may indicate a motivated seller, a property that needs work (opportunity for value-add), or simply a listing that hasn't been discovered yet.

**Caveat:** Zestimates are estimates and can be inaccurate, especially for unique properties or those with recent renovations. Use this as one signal, not gospel.

### 3. Days on Market (DOM) — 20 points

How long the property has been listed on Zillow.

- **0 days** scores **0/20**
- **90+ days** scores **20/20** (full marks)
- Linear scale between 0 and 90 days

**Why this matters:** Properties sitting on the market for extended periods often have sellers who are increasingly motivated to negotiate. High DOM can mean the property is overpriced (and may get reduced) or that there's an issue — either way, it creates negotiating leverage.

### 4. Price Reduction — 15 points

Whether the seller has already reduced the listing price, and by how much.

- **No reduction** scores **0/15**
- **5% or greater reduction** (relative to original price) scores **15/15** (full marks)
- Linear scale between 0% and 5%

**Why this matters:** A price reduction is a concrete signal that the seller is motivated and willing to negotiate. Multiple or large reductions are even stronger signals.

### Letter Grades

For quick reference, scores map to letter grades:

| Score | Grade | Interpretation |
|---|---|---|
| 70–100 | A+ | Exceptional deal — investigate immediately |
| 55–69 | A | Strong deal — worth serious consideration |
| 45–54 | B+ | Above average — good potential |
| 35–44 | B | Moderate deal — some favorable signals |
| 25–34 | C+ | Slightly below average — one or two positives |
| 15–24 | C | Average listing — no strong deal signals |
| 0–14 | D | At or above market — not a deal |

---

## Understanding the Output

### Terminal Output

A typical listing in the output looks like this:

```
──────────────────────────────────────────────────────────
  #1  [A]  Score: 58.3/100
  1234 N Meridian St, Indianapolis, IN 46220
  Price: $275,000   |   3bd/2ba   |   1,800 sqft
  $/sqft: $153   |   Zestimate: $315,000 (+40,000)
  Days on market: 67   |   Price cut: $15,000   |   Built: 1952
  Scores → comps: 22.5/40  zest: 17.8/25  DOM: 14.9/20  reduction: 3.1/15
  https://www.zillow.com/homedetails/12345_zpid/
──────────────────────────────────────────────────────────
```

**Reading the output:**
- **Rank & Grade** — `#1 [A]` means this is the top-ranked deal with an "A" grade
- **Score** — `58.3/100` is the composite deal score
- **Price line** — List price, bed/bath count, and square footage
- **$/sqft line** — The key metric, plus the Zestimate and the gap (positive = listed below Zestimate)
- **Details line** — Days on market, any price cuts, and year built
- **Score breakdown** — How points were earned across all four factors
- **URL** — Direct link to the Zillow listing page

### CSV Output

When using `--csv`, the file contains all scored listings (not just the top N) with columns:

`rank, deal_score, address, price, zestimate, sqft, price_per_sqft, bedrooms, bathrooms, property_type, days_on_market, price_reduction, year_built, url, score_comps, score_zestimate, score_dom, score_reduction`

Open in Excel, Google Sheets, or any spreadsheet tool for further analysis, sorting, and filtering.

---

## API Budget & Rate Limits

| Tier | Requests/Month | Cost |
|---|---|---|
| Basic | 50 | Free |
| Pro | 500 | ~$10/mo |
| Ultra | 1000 | ~$25/mo |

**Per-run cost:** A typical run of the scraper uses **1–2 API calls** (one per page of results, ~40 listings per page). With the Basic tier's 50 requests/month, you can comfortably run the scraper **25+ times per month**.

The scraper tracks and displays API call count at the end of each run:

```
──────────────────────────────────────────────────────────
  API calls used this run: 2
──────────────────────────────────────────────────────────
```

**Rate limiting:** If you hit the API rate limit (HTTP 429), the client automatically backs off with exponential retry (2s, 4s, 8s) up to 3 attempts.

---

## Project Structure

```
scraper/
├── __init__.py          # Package marker
├── main.py              # CLI entry point — argument parsing, output formatting
├── scoring.py           # Comp analysis engine — grouping, scoring, Listing dataclass
├── zillow_client.py     # Zillow RapidAPI wrapper — HTTP calls, retry logic
├── requirements.txt     # Python dependencies
└── README.md            # This file
```

### Module Details

**`zillow_client.py`** — `ZillowClient` class
- Wraps Zillow RapidAPI providers with typed methods (configurable via `RAPIDAPI_ZILLOW_HOST`)
- `search_listings(zip_code)` — Fetches active for-sale listings (1 API call)
- `get_property_details(zpid)` — Gets full property detail (1 API call, not used in default flow)
- `get_comps(zpid)` — Gets similar properties (1 API call, not used in default flow)
- Handles rate limits (429), transient errors, and retries automatically
- Tracks total API calls via `request_count`

**`scoring.py`** — Analysis engine
- `Listing` dataclass — Normalized property data with computed fields (`price_per_sqft`, `deal_score`, `score_breakdown`)
- `parse_listings(api_response)` — Converts raw API JSON into `Listing` objects, filtering out any without valid price/sqft
- `score_listings(listings)` — Groups, scores, and sorts listings by deal score descending
- `_group_key(listing)` — Creates comp group key like `"SINGLE_FAMILY_3bd"`
- `_parse_price_reduction(val)` — Handles string formats like `"$5,000 (Jan 15)"` → `5000.0`

**`main.py`** — CLI interface
- Argument parsing via `argparse`
- `print_listing()` — Formatted terminal output with letter grades
- `export_csv()` — Full export with all fields and score breakdowns
- `main()` — Orchestrates fetch → parse → score → display pipeline

---

## Troubleshooting

| Problem | Solution |
|---|---|
| `RAPIDAPI_KEY is required` | Set the env var: `export RAPIDAPI_KEY="your-key"` |
| `No listings found` | Verify your API key is valid and the zip code has active listings |
| `HTTP 403 Forbidden` | Your RapidAPI key may be invalid or your subscription expired |
| `HTTP 429 Too Many Requests` | You've hit the rate limit — the client will auto-retry, but you may need to wait |
| `0 listings with valid price & sqft` | All listings in that zip are missing square footage data (rare) |
| Low scores across the board | The market in that zip is fairly priced — no obvious deals right now |
| Only a few listings returned | Small zip code, or most listings lack sqft data. Try a neighboring zip |
