const establishmentModel = require('../models/establishment')

module.exports.create = async ({ body, auth }) => {
  const { id: userId } = auth.user

  const establishment = await establishmentModel.createEstablishment(
    body,
    userId
  )

  return {
    statusCode: 201,
    body: {
      message: 'establishment.created',
      result: establishment,
    },
  }
}

module.exports.update = async ({ body, params }) => {
  const establishment = await establishmentModel.updateEstablishment(
    params.id,
    body
  )

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
  const establishment = await establishmentModel.showEstablishment(id)

  return {
    statusCode: 200,
    body: {
      message: 'establishment.show',
      result: establishment,
    },
  }
}
