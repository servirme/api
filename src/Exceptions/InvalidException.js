const Exception = require('./Exception')
const { invalid } = require('../../config/errorCodes')

const messageSuffix = 'invalid'

class InvalidException extends Exception {
  /**
   * @param {string} resourceName
   */
  constructor(resourceName = 'generic') {
    const message = `${resourceName}-${messageSuffix}`
    super(400, invalid[resourceName], message)
  }
}

module.exports = InvalidException
