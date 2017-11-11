const Exception = require('./Exception')
const { internalError } = require('../../config/errorCodes')
const log = require('../lib/log')

class InternalException extends Exception {
  /**
   * @param {...*} errs
   */
  constructor(...errs) {
    super(500, internalError, 'http-500')
    log('error', ...errs, this.stack)
  }
}

module.exports = InternalException
