# Step 0: Create server container
echo "Building server container..."
docker build -t mganza/language-power:server-prod -f docker/Dockerfile-server-prod .

echo "Building client container..."
docker build -t mganza/language-power:front-prod \
  --build-arg GQL_URL=/data/graphql \
  --build-arg TOKEN_TTL=7 \
  --build-arg NODE_ENV=production \
 -f docker/Dockerfile-front .

echo "Login to docker hub..."
docker login -u mganza

echo "Uploading server image to docker hub..."
docker push mganza/language-power:server-prod

echo "Uploading client image to docker hub..."
docker push mganza/language-power:front-prod

echo "Cleaning up..."
docker logout
docker image rm mganza/language-power:server-prod mganza/language-power:front-prod
