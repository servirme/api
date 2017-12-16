const log4js = require('log4js')

const { NODE_ENV } = process.env

const log4jsConfig = {
  pm2: NODE_ENV === 'prod',
  appenders: {
    api: {
      type: 'stdout',
    },
  },
  categories: {
    default: {
      appenders: ['api'],
      level: 'ALL',
    },
  },
}

log4js.configure(log4jsConfig)
