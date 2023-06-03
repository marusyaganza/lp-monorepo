Create network for containers

`docker network create lp-network`

To run mongodb database

`docker run --name lp-db --rm -d -v data:/data/db -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=mongoadmin -e MONGO_INITDB_ROOT_PASSWORD=secret mongo`

To run test DB

`docker run --name test-db --rm -d -v /data/test-db -p 27017:27017 mongo`

To run mongodb database in the network

`docker run --name lp-db --rm -d --network lp-network mongo`

To stop db container

`sudo docker stop lp-db`

Build BE image

`docker build -t lp-be .`

Run container

`docker run --name lp-server --rm lp-server`

Run container in the network

`docker run --name lp-server --rm --network lp-network lp-server`

Read mongo logs

`docker logs lp-db`
