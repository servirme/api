const authModel = require('../models/auth')

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
