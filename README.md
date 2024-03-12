# academia-sync

### How to develop?

- clone the repo (assuming to use ssh)

```bash
git clone git@github.com:yassa-alqess/academia-sync-app.git
```

- add `.env.dev` with the proper env variables for each service (check `.env.example`)

- make sure u have docker and docker-compose installed (check [docker](https://docs.docker.com/get-docker/) and [docker-compose](https://docs.docker.com/compose/install/))

- run the following command to start the containers

```bash
docker-compose -f docker-compose.yaml -f docker-compose.dev.yaml up -d --build
```
