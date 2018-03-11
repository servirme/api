const { map } = require('ramda')

const planTransform = require('../transforms/plan')
const planRepository = require('../repositories/plan')

module.exports.listPlans = () => {
  return planRepository.paginate()
    .then(map(planTransform.output))
}

module.exports.show = (id) => {
  return planRepository.getOneById(id)
    .then(planTransform.output)
}
