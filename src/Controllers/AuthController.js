const authModel = require('../Models/AuthModel')
const AuthValidator = require('../Validators/AuthValidator')

const validator = new AuthValidator()

module.exports.login = (req) => {
  const validatedReq = validator.validate('login', req)

  const { body } = validatedReq

  return authModel.signIn(body)
    .then(user => ({
      statusCode: 200,
      body: {
        message: 'signed.in',
        result: user,
      },
    }))
}

module.exports.register = (req) => {
  const validatedReq = validator.validate('register', req)

  const { body } = validatedReq

  return authModel.signUp(body)
    .then(user => ({
      statusCode: 201,
      body: {
        message: 'signed.up',
        result: user,
      },
    }))
}
