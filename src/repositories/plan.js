const { database } = require('../helpers/database')
const { DATABASE } = require('../../config/constants')

module.exports.paginate = () => {
  return database.master.plan
    .findAll({ searchPath: DATABASE.MASTER })
}

module.exports.getOneById = (id) => {
  return database.master.plan
    .findById(id, { searchPath: DATABASE.MASTER })
}
