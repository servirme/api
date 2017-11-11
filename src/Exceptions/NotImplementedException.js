const InternalException = require('./InternalException')

class NotImplementedException extends InternalException {
  constructor(filename, action) {
    super(`${filename.replace(/(.*)\..*/, '$1')}.${action} isn't implemented`)
  }
}

module.exports = NotImplementedException
