const AuthModel = require('../Models/AuthModel')
const AuthValidator = require('../Validators/AuthValidator')

class AuthController {
  constructor() {
    this.model = new AuthModel()
    this.validator = new AuthValidator()
  }

  signIn(req) {
    const validatedReq = this.validator.validate('signIn', req)

    const { body } = validatedReq

    return this.model.signIn(body)
      .then(user => ({
        statusCode: 201,
        body: {
          message: 'signed.in',
          result: user,
        },
      }))
  }

  signUp(req) {
    const validatedReq = this.validator.validate('signUp', req)

    const { body, path } = validatedReq
    const { estabilishmentId } = path

    return this.model.signUp(estabilishmentId, body)
      .then(estabilishment => ({
        statusCode: 200,
        body: {
          message: 'signed.up',
          result: estabilishment,
        },
      }))
  }
}

module.exports = AuthController
