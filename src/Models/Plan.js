const planTransform = require('../transforms/plan')
const PlanRepository = require('../Repositories/Plan')

class PlanModel {
  constructor({
    planRepository = new PlanRepository(),
    transform = planTransform,
  } = {}) {
    this.planRepository = planRepository
    this.planTransform = transform
  }

  list() {
    return this.planRepository.paginate()
      .map(planTransform.output)
  }

  show(id) {
    return this.planRepository.getOneById(id)
      .then(planTransform.output)
  }
}

module.exports = PlanModel
