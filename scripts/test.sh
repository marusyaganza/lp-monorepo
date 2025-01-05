#!/bin/bash

# Step 0: Prepare environment
echo "Preparing environment..."
cp  ./docker/.dockerignore.local ./.dockerignore

# Step 1: Start linting
echo "Starting linters..."
yarn install
yarn ready

# Step 2: Start the Docker containers in detached mode
echo "Starting Docker containers..."
docker compose -f docker-compose-test.yml up -d

# Step 3: Run additional tests after Cypress completes
echo "Running additional tests..."
yarn test

# Step 4: Run Cypress tests and wait for them to complete
echo "Running Cypress tests..."
yarn cypress:run

# Step 5: Clean up Docker containers, images, volumes, and cache
echo "Stopping and cleaning up Docker containers..."
docker compose -f docker-compose-test.yml down --rmi all --volumes --remove-orphans && docker buildx prune -af
rm .dockerignore

echo "All tasks completed."


