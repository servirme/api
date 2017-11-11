const Exception = require('./Exception')
const { expired } = require('../../config/errorCodes')

const messageSuffix = 'expired'

class ExpiredException extends Exception {
  /**
   * @param {string} resourceName
   */
  constructor(resourceName = 'generic') {
    const message = `${resourceName}-${messageSuffix}`
    super(410, expired[resourceName], message)
  }
}

module.exports = ExpiredException
