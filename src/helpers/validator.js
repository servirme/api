const Joi = require('joi')

module.exports.getRuleRequired = (rule, required) => {
  if (required) {
    return rule.required()
  }

  return rule
}

module.exports.paginate = {
  page: Joi.number().min(1),
  limit: Joi.number().min(1).max(100),
}
