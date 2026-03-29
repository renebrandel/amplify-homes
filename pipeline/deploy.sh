#!/usr/bin/env bash
# ═══════════════════════════════════════════════════════════════════
#  Deploy the Amplify Homes scraper pipeline to AWS
# ═══════════════════════════════════════════════════════════════════
#
#  Prerequisites:
#    1. AWS CLI configured with credentials (aws configure)
#    2. AWS SAM CLI installed (brew install aws-sam-cli)
#    3. Your RapidAPI key
#    4. The DynamoDB table name from Amplify (find in AWS Console)
#
#  Usage:
#    # First-time deploy (interactive prompts for parameters):
#    ./pipeline/deploy.sh
#
#    # Subsequent deploys (reuses saved config):
#    ./pipeline/deploy.sh --no-confirm
#
# ═══════════════════════════════════════════════════════════════════
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
STACK_NAME="amplify-homes-pipeline"
REGION="${AWS_REGION:-eu-west-2}"

echo ""
echo "══════════════════════════════════════════════════════"
echo "  Amplify Homes — Pipeline Deployment"
echo "  Stack:  $STACK_NAME"
echo "  Region: $REGION"
echo "══════════════════════════════════════════════════════"
echo ""

# ─── Validate prerequisites ──────────────────────────────────────
command -v sam >/dev/null 2>&1 || {
    echo "ERROR: AWS SAM CLI is not installed."
    echo "  Install: brew install aws-sam-cli"
    echo "  Docs:    https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/install-sam-cli.html"
    exit 1
}

command -v aws >/dev/null 2>&1 || {
    echo "ERROR: AWS CLI is not installed."
    echo "  Install: brew install awscli"
    exit 1
}

# ─── Build ────────────────────────────────────────────────────────
echo "Building Lambda package..."
cd "$SCRIPT_DIR"
sam build --template-file template.yaml

# ─── Deploy ───────────────────────────────────────────────────────
echo ""
echo "Deploying to AWS..."

if [[ "${1:-}" == "--no-confirm" ]]; then
    sam deploy \
        --stack-name "$STACK_NAME" \
        --region "$REGION" \
        --no-confirm-changeset \
        --capabilities CAPABILITY_IAM
else
    # First-time: interactive guided deploy
    sam deploy \
        --guided \
        --stack-name "$STACK_NAME" \
        --region "$REGION" \
        --capabilities CAPABILITY_IAM
fi

echo ""
echo "══════════════════════════════════════════════════════"
echo "  Deployment complete!"
echo ""
echo "  View logs:"
echo "    sam logs -n amplify-homes-scraper --tail"
echo ""
echo "  Trigger manually:"
echo "    aws lambda invoke \\"
echo "      --function-name amplify-homes-scraper \\"
echo "      --payload '{\"zip_codes\": [\"46220\"]}' \\"
echo "      /dev/stdout"
echo "══════════════════════════════════════════════════════"
echo ""
