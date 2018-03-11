const ConflictError = require('../Errors/Conflict')

module.exports.checkConflict = modelName => (err) => {
  if (err.name === 'SequelizeUniqueConstraintError') {
    throw new ConflictError(modelName)
  }
  throw err
}
