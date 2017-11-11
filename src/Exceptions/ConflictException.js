const Exception = require('./Exception')
const { conflict } = require('../../config/errorCodes')

const suffixMessage = 'already-exists'

class ConflictException extends Exception {
  /**
   * @param {string} resourceName
   */
  constructor(resourceName = 'generic') {
    const message = `${resourceName}-${suffixMessage}`
    super(409, conflict[resourceName], message)
  }
}

module.exports = ConflictException
