const establishmentModel = require('../models/establishment')

module.exports.create = async (req) => {
  const { body, auth } = req
  const { id: userId } = auth.user

  const establishment = await establishmentModel.create(req, body, userId)

  return {
    statusCode: 201,
    body: {
      message: 'establishment.created',
      result: establishment,
    },
  }
}

module.exports.update = async (req) => {
  const { body, params } = req
  const establishment = await establishmentModel.update(req, params.id, body)

  return {
    statusCode: 200,
    body: {
      message: 'establishment.updated',
      result: establishment,
    },
  }
}

module.exports.show = async ({ params }) => {
  const { id } = params
  const establishment = await establishmentModel.show(id)

  return {
    statusCode: 200,
    body: {
      message: 'establishment.show',
      result: establishment,
    },
  }
}
