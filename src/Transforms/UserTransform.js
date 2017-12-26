const { applySpec, prop } = require('ramda')

module.exports.input = applySpec({
  email: prop('email'),
  password: prop('password'),
})
