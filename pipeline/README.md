# Scraper Pipeline

Serverless pipeline that runs the comp scraper on a daily schedule and writes scored deals to DynamoDB. Deployed with AWS SAM (Serverless Application Model).

---

## Architecture

```
EventBridge (daily cron)
     │
     ▼
┌───────────────────┐     ┌──────────────┐     ┌──────────────┐
│  Lambda Function  │────▶│ Zillow API   │     │  DynamoDB    │
│  (Python 3.11)    │     │ (RapidAPI)   │     │  (Home table)│
│                   │◀────┤              │     │              │
│  For each zip:    │     └──────────────┘     │              │
│   1. Fetch        │                          │              │
│   2. Parse        │──────────────────────────▶│              │
│   3. Score        │   batch_write_item       │              │
│   4. Write        │                          │              │
└───────────────────┘                          └──────┬───────┘
                                                      │
                                                      ▼
                                               ┌──────────────┐
                                               │   AppSync    │
                                               │  (GraphQL)   │
                                               └──────┬───────┘
                                                      │
                                                      ▼
                                               ┌──────────────┐
                                               │  React App   │
                                               │  (frontend)  │
                                               └──────────────┘
```

## Prerequisites

1. **AWS CLI** configured with credentials (`aws configure`)
2. **AWS SAM CLI** installed ([install guide](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/install-sam-cli.html))
3. **RapidAPI key** for the `zillow-com1` API
4. **Amplify backend deployed** (`amplify push`) — you need the DynamoDB table name

### Finding your DynamoDB table name

After running `amplify push`, find the Home table name:

```bash
# Option 1: AWS Console
# Go to DynamoDB > Tables — look for "Home-XXXXXXXXXX-staging"

# Option 2: CLI
aws dynamodb list-tables --region eu-west-2 | grep Home
```

The table name looks like: `Home-abc123xyz-staging`

---

## Deployment

### First-time deploy (interactive)

```bash
./pipeline/deploy.sh
```

SAM will prompt you for:
- **HomeTableName** — your DynamoDB table name (e.g., `Home-abc123xyz-staging`)
- **RapidApiKey** — your RapidAPI key (stored encrypted in Parameter Store)
- **ScheduleExpression** — how often to run (default: `rate(1 day)`)

### Subsequent deploys

```bash
./pipeline/deploy.sh --no-confirm
```

---

## Manual Invocation

Trigger the scraper on-demand without waiting for the schedule:

```bash
# Scrape all configured zips
aws lambda invoke \
  --function-name amplify-homes-scraper \
  --payload '{}' \
  /dev/stdout

# Scrape specific zips only
aws lambda invoke \
  --function-name amplify-homes-scraper \
  --payload '{"zip_codes": ["46220", "46205"]}' \
  /dev/stdout
```

### Response format

```json
{
  "status": "complete",
  "api_calls_used": 6,
  "zips_processed": 3,
  "total_deals_written": 47,
  "results": {
    "46220": { "scraped": 18, "written": 18 },
    "46205": { "scraped": 15, "written": 15 },
    "46202": { "scraped": 14, "written": 14 }
  }
}
```

---

## Configuration

Edit `pipeline/config.py` to change:

| Setting | Default | Description |
|---|---|---|
| `TARGET_ZIPS` | 5 Indy zips | Zip codes to scrape each run |
| `MIN_SCORE_TO_STORE` | `10` | Minimum deal score to write to DynamoDB |
| `MAX_API_CALLS_PER_RUN` | `15` | Safety cap on API calls per Lambda invocation |

### API budget math

- **Free tier:** 50 requests/month
- **Per zip:** 1–2 API calls (1 per page of results)
- **5 zips daily:** ~10 calls/day × 30 days = ~300 calls/month (need Pro tier)
- **5 zips weekly:** ~10 calls/week × 4 weeks = ~40 calls/month (fits free tier)

Adjust `ScheduleExpression` in the SAM template to match your budget:

```yaml
# Daily (needs Pro tier for 5+ zips)
Schedule: "rate(1 day)"

# Weekly (fits free tier)
Schedule: "rate(7 days)"

# Twice a week
Schedule: "cron(0 8 ? * MON,THU *)"
```

---

## Monitoring

### View logs

```bash
# Tail logs in real-time
sam logs -n amplify-homes-scraper --tail

# View last hour of logs
sam logs -n amplify-homes-scraper --start-time '1h ago'
```

### CloudWatch

Logs are retained for **14 days** (configured in the SAM template). Find them in the AWS Console under CloudWatch > Log Groups > `/aws/lambda/amplify-homes-scraper`.

---

## How Data Flows to the Frontend

Once the pipeline writes to DynamoDB, the existing AppSync GraphQL API makes the data available to the React app automatically. No additional wiring needed — Amplify's `@model` directive generates all CRUD resolvers.

Query listings from the React app:

```javascript
import { API, graphqlOperation } from 'aws-amplify';

// Auto-generated by `amplify codegen`
const listHomes = /* GraphQL */ `
  query ListHomes($filter: ModelHomeFilterInput) {
    listHomes(filter: $filter) {
      items {
        id
        address
        price
        dealScore
        pricePerSqft
        bedrooms
        bathrooms
        imageUrl
        zillowUrl
        zipCode
      }
    }
  }
`;

// Fetch all deals
const result = await API.graphql(graphqlOperation(listHomes));

// Fetch deals for a specific zip
const result = await API.graphql(graphqlOperation(listHomes, {
  filter: { zipCode: { eq: "46220" } }
}));
```

---

## Files

```
pipeline/
├── handler.py        # Lambda entry point — orchestrates scrape → score → write
├── config.py         # Target zip codes, score thresholds, budget caps
├── requirements.txt  # Lambda Python dependencies (requests only)
├── template.yaml     # SAM template — Lambda + EventBridge + IAM
├── deploy.sh         # One-command deployment script
└── README.md         # This file
```
