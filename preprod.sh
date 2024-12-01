#!/bin/bash

# Step 0: Start linting
echo "Starting linters..."
yarn eslint

# Step 1: Start the Docker containers in detached mode
echo "Starting Docker containers..."
docker compose -f docker-compose-preprod.yml up -d

# Step 2: Run additional tests after Cypress completes
echo "Running additional tests..."
yarn test

# Step 3: Run Cypress tests and wait for them to complete
echo "Running Cypress tests..."
yarn cypress:run

# Step 4: Clean up Docker containers, images, volumes, and cache
echo "Stopping and cleaning up Docker containers..."
docker compose -f docker-compose-prod.yml down --rmi all --volumes --remove-orphans && docker buildx prune -af

echo "All tasks completed."


