const log4js = require('log4js')
const { assocPath, isNil, path } = require('ramda')

const { isProd, env } = require('./env')

const logLevels = {
  production: 'ALL',
  test: 'ERROR',
  development: 'ALL',
}
const logType = isProd ? 'dateFile' : 'stdout'
const layoutType = isProd ? 'json' : 'colored'

const log4jsConfig = {
  pm2: isProd,
  levels: {
    RESPONSE_ERROR_4XX: {
      value: log4js.levels.WARN.level,
      colour: 'red',
    },
    RESPONSE_ERROR_5XX: {
      value: log4js.levels.FATAL.level,
      colour: 'red',
    },
  },
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
      level: logLevels[env],
    },
    database: {
      appenders: ['databaseFile'],
      level: logLevels[env],
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

const jsonLayout = () => logEvent => logEvent.data.map(data => JSON.stringify({
  timestamp: logEvent.startTime,
  level: logEvent.level.levelStr,
  category: logEvent.categoryName,
  data: replaceSensitiveFields(data),
}))
  .join('\n')

log4js.addLayout('json', jsonLayout)
log4js.configure(log4jsConfig)
