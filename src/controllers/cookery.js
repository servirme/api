const cookeryModel = require('../models/cookery')

module.exports.index = () => {
  return cookeryModel.list()
    .then(cookeries => ({
      statusCode: 200,
      body: {
        message: 'cookeries.list',
        result: cookeries,
      },
    }))
}

module.exports.show = (req) => {
  const { params } = req
  const { id } = params

  return cookeryModel.show(id)
    .then(cookery => ({
      statusCode: 200,
      body: {
        message: 'cookeries.show',
        result: cookery,
      },
    }))
}
