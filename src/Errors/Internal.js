const log4js = require('log4js')

const BaseError = require('./BaseError')
const { internalError } = require('../../config/errorCodes')
const { env } = require('../../config/env')

const apiLogger = log4js.getLogger('api')

class InternalError extends BaseError {
  constructor(err, requestId) {
    super(500, internalError, 'http.500')

    if (env === 'development') {
      this.body.error = {
        message: err.message,
        stack: err.stack,
      }

      apiLogger.error(err)
      return
    }

    apiLogger.error({
      requestId,
      message: err.message,
      stackTrace: err.stack,
    })
  }
}

module.exports = InternalError
