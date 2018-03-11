const planModel = require('../models/plan')

module.exports.index = () => {
  return planModel.listPlans()
    .then(plans => ({
      statusCode: 200,
      body: {
        message: 'plans.list',
        result: plans,
      },
    }))
}

module.exports.show = (req) => {
  const { params } = req
  const { id } = params

  return planModel.show(id)
    .then(plan => ({
      statusCode: 200,
      body: {
        message: 'plans.show',
        result: plan,
      },
    }))
}
