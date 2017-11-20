const Joi = require('joi')
const Validator = require('./Validator')
const { Estabilishment } = require('./EstabilishmentValidator')
const { User } = require('./UserValidator')

class AuthValidator extends Validator {
  constructor() {
    super()

    this.addValidator('create', {
      body: Joi.object({
        estabilishment: Estabilishment(true).required(),
        user: User(true).required(),
      }),
    })
  }
}

module.exports = AuthValidator
