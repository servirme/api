const { applySpec, prop } = require('ramda')

module.exports.input = applySpec({
  name: prop('name'),
})
