set -e
set -v
set -u

if [ -z "$AWS_SECRET_ACCESS_KEY" ]; then
  echo 'AWS credentials not found'; # zsh gives parameter not set and doesn't get here but that's fine
  exit 1
fi;

export AWS_REGION='us-east-2'
export UI_S3_BUCKET='larry-john-michael-spades'
npm run deploy
