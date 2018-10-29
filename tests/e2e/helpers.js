const { mergeAll } = require('ramda')

const { AUTH } = require('../../src/constants')
const { sign } = require('../../src/helpers/jwt')
const jwtTransform = require('../../src/transforms/jwt')

const defaultPayload = {
  user: {
    id: 1,
    name: 'Servir.me',
    email: 'jwt@servir.me',
    active: true,
  },
}

const generateToken = type => (payload) => {
  const payloads = [
    { type },
    payload,
    defaultPayload,
  ]

  const finalPayload = mergeAll(payloads)
  console.log(finalPayload)
  const jwtData = jwtTransform(finalPayload)
  console.log(jwtData)

  return {
    token: sign(jwtData),
    data: jwtData,
  }
}

module.exports.auth = {
  client: generateToken(AUTH.LEVELS.CLIENT),
  admin: generateToken(AUTH.LEVELS.ADMIN),
  master: generateToken(AUTH.LEVELS.MASTER),
}
