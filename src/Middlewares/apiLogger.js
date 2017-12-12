const log4js = require('log4js')
const { assocPath, isNil, path } = require('ramda')
const { extractResponseBody } = require('../Helpers/express')

const logger = log4js.getLogger('api')

const requestSensitiveFields = [
  'password',
]

const responseSensitiveFields = []

const replaceSensitiveFields = (sensitiveFields, data) => {
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

module.exports = (req, res, next) => {
  // Request
  logger.debug({
    requestId: req.requestId,
    type: 'request',
    ip: req.connection.remoteAddress,
    url: req.url,
    query: req.query,
    method: req.method,
    headers: req.headers,
    startTime: req.startTime.toISOString(),
    body: replaceSensitiveFields(requestSensitiveFields, req.body),
  })

  const end = res.end
  res.end = (chunk, encoding) => {
    res.end = end
    res.end(chunk, encoding)

    const responseBody = extractResponseBody(chunk, res._headers)

    const endTime = Date.now()
    const difference = endTime - req.startTime.getTime()

    // Response
    logger.debug({
      requestId: req.requestId,
      type: 'reponse',
      body: replaceSensitiveFields(responseSensitiveFields, responseBody),
      header: res._headers,
      statusCode: res.statusCode,
      latency: difference,
    })
  }

  next()
}
