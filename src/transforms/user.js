const { applySpec, prop } = require('ramda')

module.exports.jwt = applySpec({
  id: prop('id'),
  name: prop('name'),
  email: prop('email'),
  active: prop('active'),
  permission_group: prop('permission_group'),
})
