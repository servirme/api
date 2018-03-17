const userModel = require('./user')
const userTransform = require('../transforms/user')
const InvalidError = require('../Errors/Invalid')
const { checkHashPassword } = require('../helpers/security')
const { sign } = require('../helpers/jwt')

const checkPassword = (plainTextPassword) => {
  return (user) => {
    return checkHashPassword(plainTextPassword, user.password)
      .then((valid) => {
        if (!valid) {
          throw new InvalidError('password')
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
