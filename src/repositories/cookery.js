const { models } = require('./base')
const { DATABASE } = require('../../config/constants')

module.exports.paginate = () => models.master.cookeries
  .findAll({}, {
    searchPath: DATABASE.MASTER,
  })

module.exports.getOneById = id => models.master.cookeries
  .findById(id, {
    searchPath: DATABASE.MASTER,
  })
