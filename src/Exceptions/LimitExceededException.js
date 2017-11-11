const Exception = require('./Exception')
const { limitExceeded } = require('../../config/errorCodes')

const messageSuffix = 'limit-exceeded'

class LimitExceededException extends Exception {
  /**
   * @param {string} resourceName
   */
  constructor(resourceName = 'generic') {
    const message = `${resourceName}-${messageSuffix}`
    super(429, limitExceeded[resourceName], message)
  }
}

module.exports = LimitExceededException
