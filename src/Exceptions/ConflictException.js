const Exception = require('./Exception')
const { conflict } = require('../../config/errorCodes')

const suffixMessage = 'conflict'

class ConflictException extends Exception {
  constructor(resourceName = 'generic') {
    const message = `${suffixMessage}.${resourceName}`
    super(409, conflict[resourceName], message)
  }
}

module.exports = ConflictException
