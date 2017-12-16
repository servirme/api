const log4js = require('log4js')

const { NODE_ENV } = process.env

const logLevels = {
  production: 'ALL',
  test: 'ERROR',
  dev: 'ERROR',
}

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
      level: logLevels[NODE_ENV] || 'ALL',
    },
  },
}

log4js.configure(log4jsConfig)
