const EstabilishmentModel = require('../Models/EstabilishmentModel')
const EstabilishmentValidator = require('../Validators/EstabilishmentValidator')

class UserController {
  constructor() {
    this.model = new EstabilishmentModel()
    this.validator = new EstabilishmentValidator()
  }

  create(req) {
    const validatedReq = this.validator.validate('create', req)

    const { body } = validatedReq

    return this.model.createEstabilishment(body)
      .then(estabilishment => ({
        statusCode: 201,
        body: {
          message: 'estabilishment.created',
          result: estabilishment,
        },
      }))
  }

  update(req) {
    const validatedReq = this.validator.validate('update', req)

    const { body, path } = validatedReq
    const { estabilishmentId } = path

    return this.model.updateEstabilishment(estabilishmentId, body)
      .then(estabilishment => ({
        statusCode: 200,
        body: {
          message: 'estabilishment.updated',
          result: estabilishment,
        },
      }))
  }

  show(req) {
    const { path } = req
    const { estabilishmentId } = path

    return this.model.showEstabilishment(estabilishmentId)
      .then(estabilishment => ({
        statusCode: 200,
        body: {
          message: 'estabilishment.show',
          result: estabilishment,
        },
      }))
  }
}

module.exports = UserController
