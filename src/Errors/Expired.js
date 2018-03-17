const BaseError = require('./BaseError')
const { expired } = require('../../config/errorCodes')

const messageSuffix = 'expired'

class ExpiredError extends BaseError {
  constructor(resourceName = 'generic') {
    const message = `${messageSuffix}.${resourceName}`
    super(410, expired[resourceName], message)
  }
}

module.exports = ExpiredError
