const planTransform = require('../transforms/plan')
const planRepository = require('../repositories/plan')

module.exports.list = () => planRepository.paginate()
  .map(planTransform.output)

module.exports.show = id => planRepository.getOneById(id)
  .then(planTransform.output)
