const Joi = require('joi')
const Validator = require('./Validator')

const Estabilishment = (create) => {
  const name = Joi.string()
  const site = Joi.string().max(20)
  const slug = Joi.string().max(20)
  const planId = Joi.number()

  return Joi.object({
    name: Validator.getRule(name, create),
    site: Validator.getRule(site),
    slug: Validator.getRule(slug),
    planId: Validator.getRule(planId, create),
  })
}

class EstabilishmentValidator extends Validator {
  constructor() {
    super()

    this.addValidator('create', {
      body: Estabilishment(true).required(),
    })

    this.addValidator('update', {
      body: Estabilishment(false).required(),
    })
  }
}

EstabilishmentValidator.Estabilishment = Estabilishment

module.exports = EstabilishmentValidator
