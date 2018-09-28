[Servir.me](https://github.com/MatheusVellone/servir.me) API
-----------------

[![CircleCI](https://circleci.com/gh/servirme/api.svg?style=shield)](https://circleci.com/gh/servirme/api)
[![Coverage Status](https://coveralls.io/repos/github/servirme/api/badge.svg?branch=master)](https://coveralls.io/github/servirme/api?branch=master)

## Development

Git clone this repository and run `make dev`. For this command to work, you must have `docker` and `docker-compose` installed. This will bring both API and DATABASE containers up.
To expose the port you want from docker, you will need to uncomment the following lines from `docker-compose.yml` from the `api` container.
```docker
    ports:
      - 3000:3000
```
If you need a different port other than `3000`, just replace the first `3000` with your desired port.

TIP: You can configure all environment variables for your development via the `config/environment/development` file.

## Production

To run the code in production just clone this repository in your server and run `make prod`. This requires `docker` and `docker-compose` installed.
This command will run three different containers: one for `nginx`, another for the code and the database.
You will need two things to get it running with its full capabilities:
- Provide certificates for HTTPS connections, which will need the certificates in `letsencrypt/` directory. You can replace them with your own, or `git-crypt unlock` it if you have the PASSPHRASE.
- Provide environment variables via `config/environment/production`. Again you can replace with your own file with your data (you can check `config/environment/development` to see how it looks like) or unlock via `git-crypt unlock`
