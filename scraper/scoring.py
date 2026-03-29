"""
Comp analysis and deal-scoring engine.

Scoring methodology (0-100 scale, higher = better deal):
─────────────────────────────────────────────────────────
1. Price-per-sqft vs. group median  (40 pts)
   Group = same property type + bedroom count in the zip code.
   A listing at 20%+ below median $/sqft gets full marks.

2. Below Zestimate gap              (25 pts)
   Zestimate is Zillow's automated valuation. Listings priced well
   below Zestimate signal potential undervaluation.

3. Days on market                   (20 pts)
   Longer DOM = more motivated seller = more negotiating room.
   90+ days gets full marks.

4. Price reductions                 (15 pts)
   Any price cut signals seller flexibility. Bigger cuts score higher.
"""

from dataclasses import dataclass, field
from statistics import median


@dataclass
class Listing:
    """Normalized representation of a single active listing."""
    zpid: str = ""
    address: str = ""
    price: float = 0.0
    zestimate: float = 0.0
    sqft: float = 0.0
    bedrooms: int = 0
    bathrooms: float = 0.0
    property_type: str = ""
    days_on_market: int = 0
    price_reduction: float = 0.0
    lot_sqft: float = 0.0
    year_built: int = 0
    url: str = ""
    image_url: str = ""

    # Computed
    price_per_sqft: float = 0.0
    deal_score: float = 0.0
    score_breakdown: dict = field(default_factory=dict)

    def __post_init__(self):
        if self.sqft and self.sqft > 0 and self.price > 0:
            self.price_per_sqft = self.price / self.sqft


def parse_listings(api_response: dict) -> list[Listing]:
    """Convert raw Zillow API search results into Listing objects."""
    listings = []
    props = api_response.get("props") or []

    for p in props:
        price = p.get("price") or 0
        sqft = p.get("livingArea") or 0
        if price <= 0 or sqft <= 0:
            continue

        listing = Listing(
            zpid=str(p.get("zpid", "")),
            address=p.get("address", ""),
            price=float(price),
            zestimate=float(p.get("zestimate") or 0),
            sqft=float(sqft),
            bedrooms=int(p.get("bedrooms") or 0),
            bathrooms=float(p.get("bathrooms") or 0),
            property_type=p.get("propertyType", "UNKNOWN"),
            days_on_market=int(p.get("daysOnZillow") or 0),
            price_reduction=float(p.get("priceReduction", "0") or 0)
            if isinstance(p.get("priceReduction"), (int, float))
            else _parse_price_reduction(p.get("priceReduction")),
            lot_sqft=float(p.get("lotAreaValue") or 0),
            year_built=int(p.get("yearBuilt") or 0),
            url=f"https://www.zillow.com/homedetails/{p.get('zpid', '')}_zpid/",
            image_url=p.get("imgSrc", ""),
        )
        listings.append(listing)

    return listings


def _parse_price_reduction(val) -> float:
    """Handle price reduction strings like '$5,000 (Jan 15)' -> 5000.0."""
    if not val or not isinstance(val, str):
        return 0.0
    import re
    match = re.search(r"\$?([\d,]+)", val)
    if match:
        return float(match.group(1).replace(",", ""))
    return 0.0


def _group_key(listing: Listing) -> str:
    """Group listings by property type and bedroom count for fair comparison."""
    return f"{listing.property_type}_{listing.bedrooms}bd"


def score_listings(listings: list[Listing]) -> list[Listing]:
    """
    Score every listing relative to its comp group.
    Returns listings sorted by deal_score descending.
    """
    if not listings:
        return []

    # Build comp groups: median $/sqft per group
    groups: dict[str, list[float]] = {}
    for l in listings:
        key = _group_key(l)
        groups.setdefault(key, []).append(l.price_per_sqft)

    group_medians = {k: median(v) for k, v in groups.items()}

    for l in listings:
        breakdown = {}
        key = _group_key(l)
        med_ppsf = group_medians.get(key, l.price_per_sqft)

        # --- 1. Price per sqft vs median (40 pts) ---
        if med_ppsf > 0:
            pct_below = (med_ppsf - l.price_per_sqft) / med_ppsf
            # Cap at 20% below = full marks; above median = 0
            score_ppsf = max(0.0, min(1.0, pct_below / 0.20)) * 40
        else:
            score_ppsf = 0.0
        breakdown["price_vs_comps"] = round(score_ppsf, 1)

        # --- 2. Below Zestimate (25 pts) ---
        if l.zestimate > 0:
            zest_gap = (l.zestimate - l.price) / l.zestimate
            # 15%+ below Zestimate = full marks
            score_zest = max(0.0, min(1.0, zest_gap / 0.15)) * 25
        else:
            score_zest = 0.0
        breakdown["below_zestimate"] = round(score_zest, 1)

        # --- 3. Days on market (20 pts) ---
        # 90+ days = full marks, linear scale
        score_dom = min(1.0, l.days_on_market / 90.0) * 20
        breakdown["days_on_market"] = round(score_dom, 1)

        # --- 4. Price reduction (15 pts) ---
        if l.price_reduction > 0 and l.price > 0:
            reduction_pct = l.price_reduction / (l.price + l.price_reduction)
            # 5%+ reduction = full marks
            score_red = min(1.0, reduction_pct / 0.05) * 15
        else:
            score_red = 0.0
        breakdown["price_reduction"] = round(score_red, 1)

        l.deal_score = round(score_ppsf + score_zest + score_dom + score_red, 1)
        l.score_breakdown = breakdown

    listings.sort(key=lambda x: x.deal_score, reverse=True)
    return listings
