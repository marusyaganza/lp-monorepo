echo "Stopping old containers and cleaning up..."
docker stop prod-lp-front-1 prod-lp-server-1
docker container prune -f
docker image prune -a -f

echo "Login to docker hub..."
docker login -u mganza

echo "Pulling the latest images..."
docker pull mganza/language-power:server-prod
docker pull mganza/language-power:front-prod

echo "Running containers..."
docker compose -p prod -f docker-compose-deploy-prod.yml up -d

echo "Cleaning up..."
docker logout







