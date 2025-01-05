# Project README

## Required Software

- **Volta**: A JavaScript tool manager that ensures consistent project tooling.
- **Docker**: A platform for developing, shipping, and running applications in containers.

## How to Start the Project

### Locally

1. Run `yarn dev` to start the project with the development database.
2. Open `http://localhost:8080` in your browser to access the application.
3. Open `http://localhost:4000` to work with the Apollo GraphQL playground.

### For Testing

Run `yarn dev:test` to start the project with a test database (it will be deleted when the script is finished).

## Deploy Process

### Production

1. Run `yarn prod:docker` to build Docker images and upload them to Docker Hub.
2. Use the `build-prod.sh` script to deploy it on the server.

### Development

1. Run `yarn dev:docker` to build Docker images and upload them to Docker Hub.
2. Use the `build-dev.sh` script to deploy it on the server.

## Pre-production Testing

1. Run `docker compose -f docker-compose-test.yml up -d` to start the client on port `8080`. This simulates the production environment but runs with a local database.
2. Run `yarn test:preprod` for linting, Jest tests, and Cypress tests.