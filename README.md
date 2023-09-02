## Required software

- volta
- docker

## How to start a project

run `yarn codegen` to generate types from graphql schema for entire project
run `docker-compose up` to start a project
open `localhost:8080` in your browser

## Production and deploy

run `docker compose -f docker-compose-prod.yml up` to start a server on port `4000`
run `yarn build:front` to build frontend. It generates files in `packages/front/public`
