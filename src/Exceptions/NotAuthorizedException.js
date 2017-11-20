const Exception = require('./Exception')
const { unauthorized } = require('../../config/errorCodes')

const messageSuffix = 'unauthorized'

class NotAuthorizedException extends Exception {
  constructor(resourceName = 'generic') {
    const message = `${messageSuffix}.${resourceName}`
    super(401, unauthorized[resourceName], message)
  }
}

module.exports = NotAuthorizedException
