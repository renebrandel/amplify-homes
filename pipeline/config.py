"""
Pipeline configuration — zip codes, scheduling, and DynamoDB settings.

Add or remove zip codes here to control which neighborhoods the pipeline
scans. Each zip code costs 1-2 API calls per run, so keep the total under
your RapidAPI monthly budget.

Indianapolis metro zips included by default:
  46220 — Broad Ripple / Meridian-Kessler
  46205 — Meridian Hills / Butler-Tarkington
  46202 — Downtown / Old Northside
  46226 — Lawrence / Devington
  46228 — Pike Township / Georgetown
"""

# ─── Target zip codes ────────────────────────────────────────────────
# Each zip uses 1-2 API calls per scrape. With the free tier (50 req/mo)
# and daily runs, keep this list to ~5-7 zips max.
TARGET_ZIPS = [
    "46220",  # Broad Ripple / Meridian-Kessler
    "46205",  # Meridian Hills / Butler-Tarkington
    "46202",  # Downtown / Old Northside
    "46226",  # Lawrence / Devington
    "46228",  # Pike Township / Georgetown
]

# ─── DynamoDB ─────────────────────────────────────────────────────────
# Table name must match the AppSync-generated table.
# Format: Home-{API_ID}-{ENV} — set via environment variable in SAM template.
DYNAMO_TABLE_ENV_VAR = "HOME_TABLE_NAME"

# ─── Scoring ─────────────────────────────────────────────────────────
# Only write listings at or above this score to DynamoDB.
# Keeps the database focused on actual deals, not the entire market.
MIN_SCORE_TO_STORE = 10

# ─── API budget guard ────────────────────────────────────────────────
# Maximum API calls per single Lambda invocation. Prevents runaway costs
# if something goes wrong.
MAX_API_CALLS_PER_RUN = 15
