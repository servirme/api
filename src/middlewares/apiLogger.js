const log4js = require('log4js')
const onFinished = require('on-finished')

const { getData } = require('../helpers/jwt')

const logger = log4js.getLogger('api')

const getResponseLogLevel = (statusCode) => {
  if (statusCode >= 500) {
    return 'FATAL'
  }

  if (statusCode >= 400) {
    return 'WARN'
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

  onFinished(res, () => {
    const endTime = Date.now()
    const difference = endTime - req.startTime.getTime()

    const logLevel = getResponseLogLevel(res.statusCode)

    // Response
    logger.log(logLevel, {
      requestId: req.requestId,
      type: 'response',
      body: res.body,
      // eslint-disable-next-line no-underscore-dangle
      headers: res._headers,
      statusCode: res.statusCode,
      latency: difference,
    })
  })

  next()
}
