#!/bin/bash

# Function to clean up Docker container on exit
cleanup() {
    echo "Stopping MongoDB container..."
    docker stop test-db
    echo "All tasks completed."
}

# Set trap to call cleanup function on EXIT, INT (Ctrl+C), TERM (termination), and HUP (hang-up signal when terminal closes)
trap cleanup EXIT INT TERM HUP

# Step 1: Start the Docker DB in detached mode
echo "Starting MongoDB..."

# Check if container named "test-db" already exists
if [ "$(docker ps -a -q -f name=test-db)" ]; then
    echo "Container 'test-db' already exists, starting it..."
    docker start test-db
else
    echo "Container 'test-db' does not exist, creating and starting a new one..."
    docker run --name test-db --rm -d -v /data/test-db -p 27017:27017 mongo:4
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
