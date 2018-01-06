const Joi = require('joi')
const Validator = require('./Validator')

class AuthValidator extends Validator {
  constructor() {
    super()

    this.addValidator('signIn', {
      body: Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
      }),
    })

    this.addValidator('signUp', {
      body: Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
      }),
    })
  }
}

module.exports = AuthValidator
