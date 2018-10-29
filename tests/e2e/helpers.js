const { mergeAll } = require('ramda')

const { AUTH } = require('../../src/constants')
const { sign } = require('../../src/helpers/jwt')

const defaultPayload = {
  user: {
    id: 1,
    name: 'Servir.me',
    email: 'jwt@servir.me',
    active: true,
  },
}

const generateToken = type => (payload, mergeWithDefault = true) => {
  const payloads = [
    { type },
    payload,
  ]

  if (mergeWithDefault) {
    payloads.push(defaultPayload)
  }

  const finalPayload = mergeAll(payloads)

  return sign(finalPayload)
}

module.exports.auth = {
  client: generateToken(AUTH.LEVELS.CLIENT),
  admin: generateToken(AUTH.LEVELS.ADMIN),
  master: generateToken(AUTH.LEVELS.MASTER),
}
