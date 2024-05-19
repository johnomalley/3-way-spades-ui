set -e
set -v
set -u

export AWS_REGION='us-east-2'
export UI_S3_BUCKET='larry-john-michael-spades'
npm run deploy
