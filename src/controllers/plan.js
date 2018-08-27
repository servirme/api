const planModel = require('../models/plan')

module.exports.index = async () => {
  const plans = await planModel.list()

  return {
    statusCode: 200,
    body: {
      message: 'plans.list',
      result: plans,
    },
  }
}

module.exports.show = async ({ params }) => {
  const { id } = params

  const plan = await planModel.show(id)

  return {
    statusCode: 200,
    body: {
      message: 'plans.show',
      result: plan,
    },
  }
}
