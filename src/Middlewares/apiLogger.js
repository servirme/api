const log4js = require('log4js')
const { extractResponseBody } = require('../Helpers/express')

const logger = log4js.getLogger('api')

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
    body: req.body,
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
      body: responseBody,
      header: res._headers,
      statusCode: res.statusCode,
      latency: difference,
    })
  }

  next()
}
