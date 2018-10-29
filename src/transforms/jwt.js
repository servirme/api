const uuid = require('uuid/v4')
const {
  applySpec,
  pipe,
  prop,
} = require('ramda')

const jwtUser = applySpec({
  id: prop('id'),
  name: prop('name'),
  email: prop('email'),
  active: prop('active'),
})

module.exports = applySpec({
  id: uuid,
  user: pipe(prop('user'), jwtUser),
})
