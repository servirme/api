const log4js = require('log4js')
const { assocPath, isNil, path } = require('ramda')

const { NODE_ENV } = process.env

const isProduction = NODE_ENV === 'production'
const logLevels = {
  production: 'ALL',
  test: 'WARN',
  development: 'ALL',
}
const logType = isProduction ? 'dateFile' : 'stdout'
const layoutType = isProduction ? 'json' : 'colored'

const log4jsConfig = {
  pm2: isProduction,
  appenders: {
    apiFile: {
      type: logType,
      alwaysIncludePattern: true,
      daysToKeep: 30,
      layout: { type: layoutType },
      filename: 'logs/api.log',
    },
    databaseFile: {
      type: logType,
      alwaysIncludePattern: true,
      daysToKeep: 30,
      layout: { type: layoutType },
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

const sensitiveFields = [
  'body.password',
  'body.token',
  'headers.token',
]

const replaceSensitiveFields = (data) => {
  if (typeof data === 'string') {
    return data
  }

  return sensitiveFields.reduce((body, sensitiveField) => {
    const fieldPath = sensitiveField.split('.')
    const needToReplace = !isNil(path(fieldPath, body))

    if (needToReplace) {
      return assocPath(fieldPath, '******', body)
    }

    return body
  }, data)
}

log4js.addLayout('json', () => logEvent =>
  logEvent.data
    .map((data) => {
      return JSON.stringify({
        timestamp: logEvent.startTime,
        level: logEvent.level.levelStr,
        category: logEvent.categoryName,
        data: replaceSensitiveFields(data),
      })
    })
    .join('\n'))

log4js.configure(log4jsConfig)
