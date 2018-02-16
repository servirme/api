const { applySpec, prop } = require('ramda')

module.exports.output = applySpec({
  id: prop('id'),
  name: prop('name'),
  description: prop('description'),
  price: prop('price'),
  active: prop('active'),
  createdAt: prop('created_at'),
  updatedAt: prop('updated_at'),
})
