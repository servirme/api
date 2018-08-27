const { models } = require('./base')
const { DATABASE } = require('../../config/constants')

module.exports.paginate = () => models.master.plan
  .findAll({}, { searchPath: DATABASE.MASTER })

module.exports.getOneById = id => models.master.plan
  .findById(id, { searchPath: DATABASE.MASTER })
