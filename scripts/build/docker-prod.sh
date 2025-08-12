# Step 0: Prepare environment
echo "Preparing environment..."
cp  ./docker/.dockerignore ./.dockerignore

# Step 1: Building containers
echo "Building server container..."
docker build -t mganza/language-power:server-prod -f docker/Dockerfile-server .

echo "Building client container..."
docker build -t mganza/language-power:front-prod \
  --build-arg GQL_URL=/data/graphql \
  --build-arg TOKEN_TTL=7 \
  --build-arg NODE_ENV=production \
 -f docker/Dockerfile-front .

# Step 2: Uploading containers
echo "Login to docker hub..."
docker login -u mganza

echo "Uploading server image to docker hub..."
docker push mganza/language-power:server-prod

echo "Uploading client image to docker hub..."
docker push mganza/language-power:front-prod

# Step 3: Cleaning up
echo "Cleaning up..."
docker logout
docker image rm mganza/language-power:server-prod mganza/language-power:front-prod
rm .dockerignore
