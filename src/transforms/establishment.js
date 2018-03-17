const { applySpec, prop } = require('ramda')

module.exports.input = applySpec({
  name: prop('name'),
  active: prop('active'),
  logo: prop('logo'),
  slug: prop('slug'),
  email: prop('email'),
  site: prop('site'),
  landline_phone: prop('landlinePhone'),
  street: prop('street'),
  number: prop('number'),
  district: prop('district'),
  city: prop('city'),
  state: prop('state'),
  category_id: prop('categoryId'),
  plan_id: prop('planId'),
})

module.exports.output = applySpec({
  id: prop('id'),
  name: prop('name'),
  active: prop('active'),
  logo: prop('logo'),
  slug: prop('slug'),
  email: prop('email'),
  site: prop('site'),
  landlinePhone: prop('landline_phone'),
  street: prop('street'),
  number: prop('number'),
  district: prop('district'),
  city: prop('city'),
  state: prop('state'),
  categoryId: prop('category_id'),
  createdAt: prop('created_at'),
  updatedAt: prop('updated_at'),
})
