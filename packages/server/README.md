
## To run test DB

`docker run --name test-db --rm -d -v /data/test-db -p 27017:27017 mongo:4`

## Read mongo logs

`docker logs lp-db`

## Run DB for local development

`docker run --name dev-db -d -v data:/data/dev-db -p 27017:27017 mongo:4`
