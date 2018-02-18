const ConflictException = require('../Exceptions/ConflictException')

module.exports.checkConflict = modelName => (err) => {
  if (err.name === 'SequelizeUniqueConstraintError') {
    throw new ConflictException(modelName)
  }
  throw err
}
