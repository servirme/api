const estabilishmentModel = require('../Models/EstabilishmentModel')
const EstabilishmentValidator = require('../Validators/EstabilishmentValidator')

const estabilishmentValidator = new EstabilishmentValidator()

module.exports.create = (req) => {
  const validatedReq = estabilishmentValidator.validate('create', req)

  const { body } = validatedReq

  return estabilishmentModel.createEstabilishment(body)
    .then(estabilishment => ({
      statusCode: 201,
      body: {
        message: 'estabilishment.created',
        result: estabilishment,
      },
    }))
}

module.exports.update = (req) => {
  const validatedReq = estabilishmentValidator.validate('update', req)

  const { body, path } = validatedReq
  const { estabilishmentId } = path

  return estabilishmentModel.updateEstabilishment(estabilishmentId, body)
    .then(estabilishment => ({
      statusCode: 200,
      body: {
        message: 'estabilishment.updated',
        result: estabilishment,
      },
    }))
}

module.exports.show = (req) => {
  const { path } = req
  const { estabilishmentId } = path

  return estabilishmentModel.showEstabilishment(estabilishmentId)
    .then(estabilishment => ({
      statusCode: 200,
      body: {
        message: 'estabilishment.show',
        result: estabilishment,
      },
    }))
}
