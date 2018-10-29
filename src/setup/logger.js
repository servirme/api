const log4js = require('log4js')
const { assocPath, isNil, path } = require('ramda')

const { isProd, env } = require('../../config/env')

const logLevels = {
  production: 'ALL',
  test: 'ERROR',
  development: 'WARN',
}
const logType = isProd ? 'apiFile' : 'console'

const log4jsConfig = {
  pm2: isProd,
  appenders: {
    apiFile: {
      type: 'dateFile',
      alwaysIncludePattern: true,
      daysToKeep: 30,
      layout: { type: 'json' },
      filename: 'logs/api.log',
    },
    console: {
      type: 'stdout',
      layout: { type: 'colored' },
    },
  },
  categories: {
    api: {
      appenders: [logType],
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
      return assocPath(fieldPath, '*', body)
    }

    return body
  }, data)
}

const jsonLayout = () => logEvent => logEvent.data.map(data => JSON.stringify({
  time: logEvent.startTime,
  level: logEvent.level.levelStr,
  category: logEvent.categoryName,
  data: replaceSensitiveFields(data),
}))
  .join('\n')

log4js.addLayout('json', jsonLayout)
log4js.configure(log4jsConfig)
