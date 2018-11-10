const BaseError = require('./BaseError')
const { unauthorized } = require('../../config/errorCodes')

const messageSuffix = 'unauthorized'

class NotAuthorizedError extends BaseError {
  constructor(resourceName = 'generic', subResource = false) {
    let message = `${messageSuffix}.${resourceName}`
    if (subResource) {
      message += `.${subResource}`
    }
    super(401, unauthorized[resourceName], message)
  }
}

module.exports = NotAuthorizedError
