const { applySpec, prop } = require('ramda')

module.exports.jwt = applySpec({
  email: prop('email'),
  active: prop('active'),
})
