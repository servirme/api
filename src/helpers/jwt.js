const Jwt = require('jsonwebtoken')
const { dissoc, pipe } = require('ramda')

const { jwt } = require('../../config/auth')
const ExpiredError = require('../Errors/Expired')
const InvalidError = require('../Errors/Invalid')

const removeJwtFields = pipe(
  dissoc('exp'),
  dissoc('iat'),
  dissoc('iss')
)

module.exports.sign = (payload, {
  expiresIn = jwt.expiresIn,
  issuer = jwt.issuer,
  secret = jwt.secret,
} = {}) => {
  const jwtSignOptions = {
    issuer,
    expiresIn,
  }

  return Jwt.sign(payload, secret, jwtSignOptions)
}

module.exports.verify = (jwtToken, {
  issuer = jwt.issuer,
  secret = jwt.secret,
} = {}) => {
  try {
    const verifyOptions = { issuer }
    return Jwt.verify(jwtToken, secret, verifyOptions)
  } catch (jwtError) {
    if (jwtError.name === 'TokenExpiredError') {
      throw new ExpiredError('jwt')
    }
    throw new InvalidError('jwt')
  }
}

module.exports.getData = pipe(Jwt.decode, removeJwtFields)

module.exports.removeJwtFields = removeJwtFields
