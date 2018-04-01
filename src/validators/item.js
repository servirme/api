const Joi = require('joi')

const { createValidator, getRuleRequired } = require('../helpers/validator')

const active = Joi.boolean()
const name = Joi.string().max(100)
const shortDescription = Joi.string().max(100)
const longDescription = Joi.string()
const imageUrl = Joi.string().max(255)
const ingredients = Joi.string()
const price = Joi.number()
const promotionPrice = Joi.number()
const sectionId = Joi.number().integer()

const itemSchema = (options = {}) => ({
  active: getRuleRequired(active),
  sectionId: getRuleRequired(sectionId, options.create),
  name: getRuleRequired(name, options.create),
  short_description: getRuleRequired(shortDescription),
  long_description: getRuleRequired(longDescription),
  image_url: getRuleRequired(imageUrl),
  ingredients: getRuleRequired(ingredients),
  price: getRuleRequired(price),
  promotion_price: getRuleRequired(promotionPrice),
})

module.exports.create = createValidator(Joi.object({
  body: itemSchema({ create: true }),
}))

module.exports.update = createValidator(Joi.object({
  body: itemSchema({ create: false }),
  params: { id: Joi.number().integer() },
}))

module.exports.show = createValidator(Joi.object({
  params: { id: Joi.number().integer() },
}))
