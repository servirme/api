const log4js = require('log4js')

const Exception = require('./Exception')
const { internalError } = require('../../config/errorCodes')

const logger = log4js.getLogger('api')
const { NODE_ENV } = process.env

class InternalException extends Exception {
  constructor(err, requestId) {
    super(500, internalError, 'http-500')

    if (NODE_ENV === 'development') {
      this._body.error = err

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

module.exports = InternalException
