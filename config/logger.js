const log4js = require('log4js')

const { NODE_ENV } = process.env

const logLevels = {
  production: 'ALL',
  test: 'ERROR',
  dev: 'ERROR',
}
const logType = NODE_ENV === 'production' ? 'file' : 'stdout'

const log4jsConfig = {
  pm2: NODE_ENV === 'prod',
  appenders: {
    api: {
      type: logType,
      filename: 'logs/api.log',
    },
    database: {
      type: logType,
      filename: 'logs/database.log',
    },
    console: {
      type: 'stdout',
    },
  },
  categories: {
    api: {
      appenders: ['api'],
      level: logLevels[NODE_ENV] || 'ALL',
    },
    database: {
      appenders: ['database'],
      level: logLevels[NODE_ENV] || 'ALL',
    },
    default: {
      appenders: ['console'],
      level: 'ALL',
    },
  },
}

log4js.configure(log4jsConfig)
