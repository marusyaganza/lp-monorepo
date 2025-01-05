echo "Stopping old containers and cleaning up..."
docker stop dev-lp-front-1 dev-lp-server-1
docker container prune -f
docker image prune -a -f

echo "Login to docker hub..."
docker login -u mganza

echo "Pulling the latest images..."
docker pull mganza/language-power:server-dev
docker pull mganza/language-power:front-dev

echo "Running containers..."
docker compose -p dev -f docker-compose-deploy-dev.yml up -d

echo "Cleaning up..."
docker logout







