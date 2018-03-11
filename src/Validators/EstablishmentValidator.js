const Joi = require('joi')
const Validator = require('./Validator')

const Establishment = (isCreation = true) => {
  const active = Joi.boolean()
  const name = Joi.string().max(100)
  const logo = Joi.string().max(150)
  const street = Joi.string().max(50)
  const number = Joi.string().max(10)
  const district = Joi.string().max(50)
  const city = Joi.string().max(50)
  const state = Joi.string().max(50)
  const site = Joi.string().max(50)
  const slug = Joi.string().max(20)
  const landlinePhone = Joi.string().max(30)
  const email = Joi.string().max(60)
  const categoryId = Joi.number().integer()

  return Joi.object({
    name: Validator.getRule(name, isCreation),
    email: Validator.getRule(email, isCreation),
    categoryId: Validator.getRule(categoryId, isCreation),
    active: Validator.getRule(active),
    logo: Validator.getRule(logo),
    street: Validator.getRule(street),
    number: Validator.getRule(number),
    district: Validator.getRule(district),
    city: Validator.getRule(city),
    state: Validator.getRule(state),
    site: Validator.getRule(site),
    slug: Validator.getRule(slug),
    landlinePhone: Validator.getRule(landlinePhone),
  })
}

class EstablishmentValidator extends Validator {
  constructor() {
    super()

    this.addValidator('create', Joi.object({
      body: Establishment().required(),
    }))

    this.addValidator('update', Joi.object({
      body: Establishment(false).required(),
    }))
  }
}

module.exports = EstablishmentValidator
