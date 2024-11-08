## Required software

- volta
- docker

## How to start a project

run `yarn codegen` to generate types from graphql schema for entire project
run `docker-compose up` to start a project
open `localhost:8080` in your browser

## Production and deploy

run `docker compose -p lp-prod -f docker-compose-prod.yml up -d`
to start the server on port `4000` and the frontend on `8080`in detached mode.

run `docker compose down` to stop containers.

run `yarn build:front` to build frontend. It generates files in `packages/front/public`.

## Develop deploy

run `docker compose -p lp-dev -f docker-compose-dev.yml up -d`
to start the server on port `4001` and the frontend on `8081`in detached mode.

run `docker compose down` to stop containers.

## Pre-production deploy

run `docker compose -f docker-compose-preprod.yml up -d`
to start front on port `8080`. For this case, the server and DB should be run locally.
