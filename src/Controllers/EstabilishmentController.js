const Controller = require('./Controller')
const EstabilishmentModel = require('../Models/EstabilishmentModel')
const EstabilishmentValidator = require('../Validators/EstabilishmentValidator')

class UserController extends Controller {
  constructor() {
    super()

    this.model = new EstabilishmentModel()
    this._useValidator(EstabilishmentValidator)
  }

  create(req) {
    const { body } = req

    return this.model.createEstabilishment(body)
      .then(() => ({
        statusCode: 201,
        body: { message: 'estabilishment.created' },
      }))
  }

  update(req) {
    const { body, path } = req
    const { estabilishmentId } = path

    return this.model.updateEstabilishment(estabilishmentId, body)
      .then(() => ({
        statusCode: 200,
        body: { message: 'estabilishment.updated' },
      }))
  }
}

module.exports = UserController
