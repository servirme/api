const PlanModel = require('../Models/Plan')

class PlanController {
  constructor({
    PlanModel: PlanModelDep = PlanModel,
  } = {}) {
    this.planModel = new PlanModelDep()

    this.index = this.index.bind(this)
    this.show = this.show.bind(this)
  }

  async index() {
    const plans = await this.planModel.list()

    return {
      statusCode: 200,
      body: {
        message: 'plans.list',
        result: plans,
      },
    }
  }

  show({ params }) {
    const { id } = params

    const plan = this.planModel.show(id)

    return {
      statusCode: 200,
      body: {
        message: 'plans.show',
        result: plan,
      },
    }
  }
}

module.exports = PlanController

