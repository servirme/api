const log4js = require('log4js')

const Exception = require('./Exception')
const { internalError } = require('../../config/errorCodes')

const logger = log4js.getLogger('api')

class InternalException extends Exception {
  constructor(err) {
    super(500, internalError, 'http-500')
    logger.error('Internal Error', err)
  }
}

module.exports = InternalException
