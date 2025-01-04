# Step 0: Create server container
echo "Building server container..."
docker build -t mganza/language-power:server-dev -f docker/Dockerfile-server-prod .

echo "Building client container..."
docker build -t mganza/language-power:front-dev \
  --build-arg GQL_URL=/data/graphql \
  --build-arg TOKEN_TTL=7 \
  --build-arg NODE_ENV=production \
 -f docker/Dockerfile-front .

echo "Login to docker hub..."
docker login -u mganza

echo "Uploading server image to docker hub..."
docker push mganza/language-power:server-dev

echo "Uploading client image to docker hub..."
docker push mganza/language-power:front-dev

echo "Cleaning up..."
docker logout
docker image rm mganza/language-power:server-dev mganza/language-power:front-dev
