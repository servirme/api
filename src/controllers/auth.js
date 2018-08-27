const authModel = require('../models/auth')
const { removeJwtFields } = require('../helpers/jwt')

module.exports.login = async ({ body }) => {
  const token = await authModel.signIn(body)

  return {
    statusCode: 200,
    body: {
      message: 'signed.in',
      token,
    },
  }
}

module.exports.register = async ({ body }) => {
  const token = await authModel.signUp(body)

  return {
    statusCode: 201,
    body: {
      message: 'signed.up',
      token,
    },
  }
}

module.exports.refreshToken = async (req) => {
  const decoded = removeJwtFields(req.auth)

  const token = await authModel.sign(decoded)

  return {
    statusCode: 200,
    body: {
      message: 'token.refresh',
      token,
    },
  }
}

module.exports.check = () => ({
  statusCode: 200,
  body: {
    message: 'token.ok',
  },
})
