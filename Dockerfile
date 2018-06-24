ARG NODE=10.3.0
ARG NPM=latest

FROM node:$NODE-alpine

WORKDIR /code

COPY package*.json /code/

RUN apk --update --no-cache add \
  git \
  g++ \
  make \
  python && \
  npm install -g node-gyp && \
  npm ci && \
  ./node_modules/pm2/bin/pm2 install pm2-intercom

COPY . /code/
