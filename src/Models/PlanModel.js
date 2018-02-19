const { map } = require('ramda')

const planTransform = require('../Transforms/PlanTransform')
const planRepository = require('../Repositories/PlanRepository')

module.exports.listPlans = () => {
  return planRepository.paginate()
    .then(map(planTransform.output))
}

module.exports.show = (id) => {
  return planRepository.getOneById(id)
    .then(planTransform.output)
}
