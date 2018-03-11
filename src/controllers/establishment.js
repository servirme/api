const establishmentModel = require('../models/establishment')
const establishmentValidator = require('../validators/establishment')

module.exports.create = (req) => {
  const { body } = establishmentValidator.create(req)

  return establishmentModel.createEstablishment(body)
    .then(establishment => ({
      statusCode: 201,
      body: {
        message: 'establishment.created',
        result: establishment,
      },
    }))
}

module.exports.update = (req) => {
  const { body, params } = establishmentValidator.update(req)

  return establishmentModel.updateEstablishment(params.id, body)
    .then(establishment => ({
      statusCode: 200,
      body: {
        message: 'establishment.updated',
        result: establishment,
      },
    }))
}

module.exports.show = (req) => {
  const { params } = establishmentValidator.update(req)

  return establishmentModel.showEstablishment(params.id)
    .then(establishment => ({
      statusCode: 200,
      body: {
        message: 'establishment.show',
        result: establishment,
      },
    }))
}
