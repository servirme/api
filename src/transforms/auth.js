const {
  applySpec,
  pipe,
  prop,
} = require('ramda')

const user = applySpec({
  id: prop('id'),
  level: prop('level'),
  name: prop('name'),
  email: prop('email'),
  active: prop('active'),
})

const establishment = applySpec({
  id: prop('id'),
})

const establishmentUser = applySpec({
  group_id: prop('group_id'),
})

module.exports.jwt = applySpec({
  user: pipe(prop('user'), user),
  establishment: pipe(prop('establishment'), establishment),
  establishmentUser: pipe(prop('establishmentUser'), establishmentUser),
})
