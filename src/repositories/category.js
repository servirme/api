const { models } = require('./base')
const { DATABASE } = require('../../config/constants')

module.exports.paginate = () => models.master.categories
  .findAll({}, {
    searchPath: DATABASE.MASTER,
  })

module.exports.getOneById = id => models.master.categories
  .findById(id, {
    searchPath: DATABASE.MASTER,
  })
