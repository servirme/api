const { models } = require('./base')

module.exports.paginate = () => models.Plan.findAll({})

module.exports.getOneById = id => models.Plan.findById(id)
