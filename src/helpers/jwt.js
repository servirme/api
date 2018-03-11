const jwt = require('jsonwebtoken')

const ExpiredError = require('../Errors/Expired')
const InvalidError = require('../Errors/Invalid')

const { JWT_SECRET } = process.env
const issuer = 'servir.me'
const jwtSignOptions = {
  expiresIn: '1d',
  issuer,
}

const jwtVerifyOptions = {
  issuer,
}

module.exports.sign = (payload) => {
  return jwt.sign(payload, JWT_SECRET, jwtSignOptions)
}

module.exports.verify = (jwtToken) => {
  try {
    return jwt.verify(jwtToken, JWT_SECRET, jwtVerifyOptions)
  } catch (jwtError) {
    if (jwtError.name === 'TokenExpiredError') {
      throw new ExpiredError('jwt')
    }
    throw new InvalidError('jwt')
  }
}
