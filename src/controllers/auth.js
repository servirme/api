const authModel = require('../models/auth')
const authValidator = require('../validators/auth')
const { removeJwtFields } = require('../helpers/jwt')

module.exports.login = (req) => {
  const { body } = authValidator.login(req)

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
  const { body } = authValidator.register(req)

  return authModel.signUp(body)
    .then(token => ({
      statusCode: 201,
      body: {
        message: 'signed.up',
        token,
      },
    }))
}

module.exports.refreshToken = (req) => {
  const decoded = removeJwtFields(req.auth)

  return Promise.resolve(decoded)
    .then(authModel.sign)
    .then(token => ({
      statusCode: 200,
      body: {
        message: 'token.refresh',
        token,
      },
    }))
}

module.exports.check = () => ({
  statusCode: 200,
  body: {
    message: 'token.ok',
  },
})
