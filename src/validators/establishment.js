const Joi = require('joi')

const { createValidator, getRuleRequired } = require('../helpers/validator')

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
const email = Joi.string().email().max(60)
const categoryId = Joi.number().integer()
const planId = Joi.number()

const establishmentSchema = (options = {}) => ({
  name: getRuleRequired(name, options.create),
  site: getRuleRequired(site),
  slug: getRuleRequired(slug),
  email: getRuleRequired(email, options.create),
  active: getRuleRequired(active),
  logo: getRuleRequired(logo),
  street: getRuleRequired(street),
  number: getRuleRequired(number),
  district: getRuleRequired(district),
  city: getRuleRequired(city),
  state: getRuleRequired(state),
  landlinePhone: getRuleRequired(landlinePhone),

  categoryId: getRuleRequired(categoryId, options.create),
  planId: getRuleRequired(planId, options.create),
})

module.exports.create = createValidator(Joi.object({
  body: establishmentSchema({ create: true }),
}))

module.exports.update = createValidator(Joi.object({
  body: establishmentSchema({ create: false }),
  params: { id: Joi.number().integer() },
}))

module.exports.show = createValidator(Joi.object({
  params: { id: Joi.number().integer() },
}))
