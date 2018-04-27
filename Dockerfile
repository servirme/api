FROM keymetrics/pm2:8-alpine

WORKDIR /code

COPY package*.json /code/

RUN apk --update --no-cache add \
  # postgresql-client \
  git \
  g++ \
  gcc \
  libgcc \
  libstdc++ \
  linux-headers \
  make \
  python && \
  npm install node-gyp -g && \
  npm update -g npm

RUN npm ci && \
  npm rebuild bcrypt --build-from-source && \
  npm cache clean --force && \
  pm2 install pm2-intercom

# If you are building your code for production
# RUN npm install --only=production

COPY . /code/
