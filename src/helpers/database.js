const { merge } = require('ramda')

const sequelize = require('../database')

const getTransaction = () => sequelize.transaction()

const paginate = (
  model,
  dbOptions = {},
  paginationOptions = {}
) => {
  const { page = 1, limit = 10 } = paginationOptions
  const databaseOptions = merge(dbOptions, {
    offset: page * limit,
    limit,
  })

  return model.findAll(databaseOptions)
}

module.exports.Operators = sequelize.Operators
module.exports.getTransaction = getTransaction
module.exports.paginate = paginate
