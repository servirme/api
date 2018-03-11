const { database } = require('../helpers/database')
const { DATABASE } = require('../../config/constants')

module.exports.paginate = () => {
  return database.master.categories
    .findAll({}, {
      searchPath: DATABASE.MASTER,
    })
}

module.exports.getOneById = (id) => {
  return database.master.categories
    .findById(id, {
      searchPath: DATABASE.MASTER,
    })
}
