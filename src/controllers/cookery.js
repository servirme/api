const cookeryModel = require('../models/cookery')

module.exports.index = async () => {
  const cookeries = await cookeryModel.list()

  return {
    statusCode: 200,
    body: {
      message: 'cookeries.list',
      result: cookeries,
    },
  }
}

module.exports.show = async ({ params }) => {
  const { id } = params

  const cookery = await cookeryModel.show(id)

  return {
    statusCode: 200,
    body: {
      message: 'cookeries.show',
      result: cookery,
    },
  }
}
