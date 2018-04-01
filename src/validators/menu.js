const Joi = require('joi')

const { createValidator, getRuleRequired } = require('../helpers/validator')

const active = Joi.boolean()
const name = Joi.string().max(100)

const menuSchema = (options = {}) => ({
  active: getRuleRequired(active),
  name: getRuleRequired(name, options.create),
})

module.exports.create = createValidator(Joi.object({
  body: menuSchema({ create: true }),
}))

module.exports.update = createValidator(Joi.object({
  body: menuSchema({ create: false }),
  params: { id: Joi.number().integer() },
}))

module.exports.show = createValidator(Joi.object({
  params: { id: Joi.number().integer() },
}))

module.exports.destroy = createValidator(Joi.object({
  params: { id: Joi.number().integer() },
}))
