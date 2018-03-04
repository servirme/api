const userModel = require('./UserModel')
const userTransform = require('../Transforms/UserTransform')
const InvalidException = require('../Exceptions/InvalidException')
const { checkHashPassword } = require('../Helpers/security')
const { sign } = require('../Helpers/jwt')

const checkPassword = (plainTextPassword) => {
  return (user) => {
    return checkHashPassword(plainTextPassword, user.password)
      .then((valid) => {
        if (!valid) {
          throw new InvalidException('password')
        }
      })
  }
}

module.exports.signUp = (credentials) => {
  return userModel.createUser(credentials)
    .then(userTransform.jwt)
    .then(sign)
}

module.exports.signIn = ({ email, password }) => {
  return userModel.getByEmail(email)
    .tap(checkPassword(password))
    .then(userTransform.jwt)
    .then(sign)
}

module.exports.sign = sign
