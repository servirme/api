const Exception = require('./Exception')
const { unauthorized } = require('../../config/errorCodes')

const messageSuffix = 'unauthorized'

class NotAuthorizedException extends Exception {
  /**
   * @param {string} resourceName
   */
  constructor(resourceName = 'generic') {
    const message = `${resourceName}-${messageSuffix}`
    super(401, unauthorized[resourceName], message)
  }
}

module.exports = NotAuthorizedException
