const log4js = require('log4js')

const { NODE_ENV } = process.env

const isProduction = NODE_ENV === 'production'
const logLevels = {
  production: 'ALL',
  test: 'WARN',
  development: 'WARN',
}
const logType = isProduction ? 'file' : 'stdout'

const log4jsConfig = {
  pm2: isProduction,
  appenders: {
    apiFile: {
      type: logType,
      filename: 'logs/api.log',
    },
    databaseFile: {
      type: logType,
      filename: 'logs/database.log',
    },
    console: {
      type: 'stdout',
    },
  },
  categories: {
    api: {
      appenders: ['apiFile'],
      level: logLevels[NODE_ENV],
    },
    database: {
      appenders: ['databaseFile'],
      level: logLevels[NODE_ENV],
    },
    default: {
      appenders: ['console'],
      level: 'ALL',
    },
  },
}

log4js.configure(log4jsConfig)
