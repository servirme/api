const log4js = require('log4js')

const BaseError = require('./BaseError')
const { internalError } = require('../../config/errorCodes')

const apiLogger = log4js.getLogger('api')
const { NODE_ENV } = process.env

class InternalError extends BaseError {
  constructor(err, requestId, {
    logger = apiLogger,
    environment = NODE_ENV,
  } = {}) {
    super(500, internalError, 'http-500')

    if (environment === 'development') {
      this.body.error = err

      logger.error(err)
      return
    }

    logger.error({
      requestId,
      message: err.message,
      stackTrace: err.stack,
    })
  }
}

module.exports = InternalError
