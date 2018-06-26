const log4js = require('log4js')
const { extractResponseBody } = require('../helpers/express')
const { getData } = require('../helpers/jwt')

const logger = log4js.getLogger('api')

const getResponseLogLevel = (statusCode) => {
  if (statusCode >= 500) {
    return 'RESPONSE_ERROR_5XX'
  }

  if (statusCode >= 400) {
    return 'RESPONSE_ERROR_4XX'
  }

  return 'DEBUG'
}

module.exports = (req, res, next) => {
  // Request
  const requestLog = {
    requestId: req.requestId,
    type: 'request',
    ip: req.connection.remoteAddress,
    url: req.url,
    query: req.query,
    method: req.method,
    headers: req.headers,
    startTime: req.startTime.toISOString(),
    body: req.body,
  }

  if (req.headers.token) {
    requestLog.auth = getData(req.headers.token)
  }

  logger.debug(requestLog)

  const { end } = res
  res.end = (chunk, encoding) => {
    res.end = end
    res.end(chunk, encoding)

    // eslint-disable-next-line no-underscore-dangle
    const responseBody = extractResponseBody(chunk, res._headers)

    const endTime = Date.now()
    const difference = endTime - req.startTime.getTime()

    const logLevel = getResponseLogLevel(res.statusCode)

    // Response
    logger.log(logLevel, {
      requestId: req.requestId,
      type: 'reponse',
      body: responseBody,
      // eslint-disable-next-line no-underscore-dangle
      headers: res._headers,
      statusCode: res.statusCode,
      latency: difference,
    })
  }

  next()
}
