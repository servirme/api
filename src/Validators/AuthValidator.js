const Joi = require('joi')
const Validator = require('./Validator')

class AuthValidator extends Validator {
  constructor() {
    super()

    this.addValidator('login', {
      body: Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
      }),
    })

    this.addValidator('register', {
      body: Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
      }),
    })
  }
}

module.exports = AuthValidator
