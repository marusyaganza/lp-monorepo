#!/bin/bash

# Step 1: Start the Docker DB in detached mode
echo "Starting MongoDB..."

# Check if container named "dev-db" already exists
if [ "$(docker ps -a -q -f name=dev-db)" ]; then
    echo "Container 'dev-db' already exists, starting it..."
    docker start dev-db
else
    echo "Container 'dev-db' does not exist, creating and starting a new one..."
    docker run --name dev-db -d -v data:/data/dev-db -p 27017:27017 mongo:4
fi

# Step 2: Installing npm packages
echo "Installing packages..."
yarn

# Step 3: Generating types
echo "Generating types..."
yarn codegen

# Step 4: Start dev server
echo "Starting dev servers..."
yarn start

# Step 5: Cleaning up
echo "Stopping MongoDB container..."
docker stop dev-db

echo "All tasks completed."
