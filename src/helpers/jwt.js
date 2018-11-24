const Jwt = require('jsonwebtoken')
const { dissoc, pipe } = require('ramda')

const { jwt } = require('../../config/auth')
const NotAuthorizedError = require('../Errors/NotAuthorized')
const InvalidError = require('../Errors/Invalid')
const authTransform = require('../transforms/auth')

const removeJwtFields = pipe(
  dissoc('exp'),
  dissoc('iat'),
  dissoc('iss')
)

const sign = (payload) => {
  const jwtSignOptions = {
    issuer: jwt.issuers,
    expiresIn: jwt.expiresIn,
  }

  return Jwt.sign(payload, jwt.secret, jwtSignOptions)
}

module.exports.sign = sign

module.exports.verify = (jwtToken) => {
  try {
    const verifyOptions = { issuer: jwt.issuer }
    return Jwt.verify(jwtToken, jwt.secret, verifyOptions)
  } catch (jwtError) {
    if (jwtError.name === 'TokenExpiredError') {
      throw new NotAuthorizedError('jwt')
    }
    throw new InvalidError('jwt')
  }
}

module.exports.getData = pipe(Jwt.decode, removeJwtFields)

module.exports.removeJwtFields = removeJwtFields

module.exports.generateToken = pipe(
  authTransform.jwt,
  sign
)
