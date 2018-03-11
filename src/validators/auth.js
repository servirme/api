const Joi = require('joi')

const { createValidator } = require('../helpers/validator')

const authSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
})

module.exports.register = createValidator(Joi.object({
  body: authSchema.required(),
}))

module.exports.login = createValidator(Joi.object({
  body: authSchema.required(),
}))
