const { dissoc, pipe } = require('ramda')
const BbPromise = require('bluebird')

const authModel = require('../Models/AuthModel')
const AuthValidator = require('../Validators/AuthValidator')

const validator = new AuthValidator()

module.exports.login = (req) => {
  const validatedReq = validator.validate('login', req)

  const { body } = validatedReq

  return authModel.signIn(body)
    .then(token => ({
      statusCode: 200,
      body: {
        message: 'signed.in',
        token,
      },
    }))
}

module.exports.register = (req) => {
  const validatedReq = validator.validate('register', req)

  const { body } = validatedReq

  return authModel.signUp(body)
    .then(token => ({
      statusCode: 201,
      body: {
        message: 'signed.up',
        token,
      },
    }))
}

const removeJwtFields = pipe(
  dissoc('exp'),
  dissoc('iat'),
  dissoc('iss')
)

module.exports.refreshToken = (req) => {
  const decoded = removeJwtFields(req.auth)

  return BbPromise.resolve(decoded)
    .then(authModel.sign)
    .then(token => ({
      statusCode: 200,
      body: {
        message: 'token.refresh',
        token,
      },
    }))
}
