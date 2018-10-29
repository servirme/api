const planTransform = require('../transforms/plan')
const { models } = require('./database')

module.exports.list = () => models.Plan.findAll({})
  .map(planTransform.output)

module.exports.show = id => models.Plan.findById(id)
  .then(planTransform.output)
