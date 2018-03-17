const { applySpec, prop } = require('ramda')

module.exports.input = applySpec({
  name: prop('name'),
  active: prop('active'),
  logo: prop('logo'),
  slug: prop('slug'),
  email: prop('email'),
  site: prop('site'),
  landlinePhone: prop('landlinePhone'),
  street: prop('street'),
  number: prop('number'),
  district: prop('district'),
  city: prop('city'),
  state: prop('state'),
  categoryId: prop('categoryId'),
})

module.exports.output = applySpec({
  name: prop('name'),
  active: prop('active'),
  logo: prop('logo'),
  slug: prop('slug'),
  email: prop('email'),
  site: prop('site'),
  landlinePhone: prop('landlinePhone'),
  street: prop('street'),
  number: prop('number'),
  district: prop('district'),
  city: prop('city'),
  state: prop('state'),
  categoryId: prop('categoryId'),
  createdAt: prop('createdAt'),
  updatedAt: prop('updatedAt'),
})
