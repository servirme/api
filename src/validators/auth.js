const Joi = require('joi')

const { AUTH } = require('../../config/constants')
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

module.exports.jwt = Joi.object({
  type: Joi.valid(Object.values(AUTH.LEVELS)).required(),
  user: Joi.object({
    id: Joi.number().required(),
    name: Joi.string(),
    email: Joi.string(),
    active: Joi.boolean(),
  }).required(),
  establishment: Joi.object({
    id: Joi.number().required(),
  }),
})
