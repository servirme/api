const Exception = require('./Exception')
const { expired } = require('../../config/errorCodes')

const messageSuffix = 'expired'

class ExpiredException extends Exception {
  constructor(resourceName = 'generic') {
    const message = `${messageSuffix}.${resourceName}`
    super(410, expired[resourceName], message)
  }
}

module.exports = ExpiredException
