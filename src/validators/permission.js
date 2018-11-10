const Joi = require('joi')

const rule = Joi.number().integer().min(1)
const groupId = Joi.number().integer().min(1)

module.exports.add = Joi.object({
  body: {
    groupId: groupId.required(),
    rules: Joi.array().items(rule).min(1).required(),
  },
})

module.exports.remove = Joi.object({
  body: {
    groupId: groupId.required(),
    rules: Joi.array().items(rule).min(1).required(),
  },
})
