const Exception = require('./Exception')
const { invalid } = require('../../config/errorCodes')

const messageSuffix = 'invalid'

class InvalidException extends Exception {
  constructor(resourceName = 'generic') {
    const message = `${messageSuffix}.${resourceName}`
    super(400, invalid[resourceName], message)
  }
}

module.exports = InvalidException
