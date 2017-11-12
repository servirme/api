const Joi = require('joi')
const Validator = require('./Validator')

class EstabilishmentValidator extends Validator {
  constructor() {
    super()

    const name = Joi.string()
    const active = Joi.boolean().default(true)
    const site = Joi.string().max(20)
    const slug = Joi.string().max(20)
    const email = Joi.string().email()
    const planId = Joi.number()

    this.addValidator('create', {
      body: Joi.object({
        name: name.required(),
        active,
        site,
        slug,
        email: email.required(),
        planId: planId.required(),
      }),
    })
  }
}

module.exports = EstabilishmentValidator
