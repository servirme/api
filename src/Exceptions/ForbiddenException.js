const Exception = require('./Exception')
const { forbidden } = require('../../config/errorCodes')

const messageSuffix = 'forbidden'

class ForbiddenException extends Exception {
  constructor(resourceName = 'generic') {
    const message = `${messageSuffix}.${resourceName}`
    super(401, forbidden[resourceName], message)
  }
}

module.exports = ForbiddenException
