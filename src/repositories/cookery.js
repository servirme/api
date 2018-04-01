const { database } = require('../helpers/database')
const { DATABASE } = require('../../config/constants')

module.exports.paginate = () => {
  return database.master.cookeries
    .findAll({
      searchPath: DATABASE.MASTER,
    })
}

module.exports.getOneById = (id) => {
  return database.master.cookeries
    .findById(id, {
      searchPath: DATABASE.MASTER,
    })
}
