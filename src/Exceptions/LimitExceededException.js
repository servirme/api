const Exception = require('./Exception')
const { limitExceeded } = require('../../config/errorCodes')

const messageSuffix = 'limit-exceeded'

class LimitExceededException extends Exception {
  constructor(resourceName = 'generic') {
    const message = `${messageSuffix}.${resourceName}`
    super(429, limitExceeded[resourceName], message)
  }
}

module.exports = LimitExceededException
