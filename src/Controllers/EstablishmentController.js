const establishmentModel = require('../Models/EstablishmentModel')
const EstablishmentValidator = require('../Validators/EstablishmentValidator')

const establishmentValidator = new EstablishmentValidator()

module.exports.create = (req) => {
  const { body } = establishmentValidator.validate('create', req)

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
  const { params } = req
  const { id } = params

  const { body } = establishmentValidator.validate('update', req)

  return establishmentModel.updateEstablishment(id, body)
    .then(establishment => ({
      statusCode: 200,
      body: {
        message: 'establishment.updated',
        result: establishment,
      },
    }))
}

module.exports.show = (req) => {
  const { params } = req
  const { id } = params

  return establishmentModel.showEstablishment(id)
    .then(establishment => ({
      statusCode: 200,
      body: {
        message: 'establishment.show',
        result: establishment,
      },
    }))
}
