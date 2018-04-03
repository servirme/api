const Joi = require('joi')

const { createValidator, getRuleRequired } = require('../helpers/validator')

const active = Joi.boolean()
const name = Joi.string().max(100)
const icon = Joi.string().max(50)
const menuId = Joi.number().integer()

const sectionSchema = (options = {}) => ({
  active: getRuleRequired(active),
  icon: getRuleRequired(icon),
  menuId: getRuleRequired(menuId, options.create),
  name: getRuleRequired(name, options.create),
})

module.exports.create = createValidator(Joi.object({
  body: sectionSchema({ create: true }),
}))

module.exports.update = createValidator(Joi.object({
  body: sectionSchema({ create: false }),
  params: { id: Joi.number().integer() },
}))

module.exports.show = createValidator(Joi.object({
  params: { id: Joi.number().integer() },
}))

module.exports.destroy = createValidator(Joi.object({
  params: { id: Joi.number().integer() },
}))
