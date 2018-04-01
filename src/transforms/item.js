const { applySpec, prop } = require('ramda')

module.exports.input = applySpec({
  section_id: prop('sectionId'),
  name: prop('name'),
  short_description: prop('shortDescription'),
  long_description: prop('longDescription'),
  image_url: prop('imageUrl'),
  ingredients: prop('ingredients'),
  price: prop('price'),
  promotion_price: prop('promotionPrice'),
  active: prop('active'),
})

module.exports.output = applySpec({
  id: prop('id'),
  sectionId: prop('section_id'),
  name: prop('name'),
  shortDescription: prop('short_description'),
  longDescription: prop('long_description'),
  imageUrl: prop('image_url'),
  ingredients: prop('ingredients'),
  price: prop('price'),
  promotionPrice: prop('promotion_price'),
  active: prop('active'),
  createdAt: prop('created_at'),
  updatedAt: prop('updated_at'),
})
