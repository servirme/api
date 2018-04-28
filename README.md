[Servir.me](https://github.com/MatheusVellone/servir.me) API
-----------------

[![Build Status](https://travis-ci.com/MatheusVellone/servir.me-api.svg?token=hiWbfTpTxqwyyAAsaHud&branch=base-api)](https://travis-ci.com/MatheusVellone/servir.me-api)
[![codecov](https://img.shields.io/codecov/c/token/HDzTH8QO22/github/MatheusVellone/servir.me-api.svg)](https://codecov.io/gh/MatheusVellone/servir.me-api)

## Development

Git clone this repository and run `make api`. For this command to work, you must have `docker` and `docker-compose` installed. This will bring both API and DATABASE containers up.
To expose the port you want from docker, you will need to uncomment the following lines from `docker-compose.yml` from the `api` container.
```
    ports:
      - 3000:3000
```
If you need a different port other than `3000`, just replace the first `3000` with your desired port.

TIP: You can configure all environment variables for your development via the `config/environment/development` file.

## Production

To run the code in production just clone this repository in your server and run `make prod`. This requires `docker` and `docker-compose` installed.
This command will run two different containers: one for `nginx` and another with the code.
You will need two things to get it running with its full capabilities:
- Provide certificates for HTTPS connections, which will need the certificates in `certs/` directory. You can replace them with your own, or `git-crypt unlock` it if you have the PASSPHRASE.
- Provide environment variables via `config/environment/production`. Again you can replace with your own file with your data (you can grab a copy of `config/environment/development` to check how it looks like) or unlock via `git-crypt unlock`
