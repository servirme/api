const userModel = require('./user')
const userTransform = require('../transforms/user')
const InvalidError = require('../Errors/Invalid')
const { checkHashPassword } = require('../helpers/security')
const { sign } = require('../helpers/jwt')
const { AUTH } = require('../../config/constants')

const checkPassword = (plainTextPassword) => {
  return (user) => {
    return checkHashPassword(plainTextPassword, user.password)
      .tap((valid) => {
        if (!valid) {
          throw new InvalidError('password')
        }
      })
  }
}

const signJwtUser = user =>
  sign({ type: AUTH.LEVELS.ADMIN, user })

module.exports.signUp = (credentials) => {
  return userModel.createUser(credentials)
    .then(userTransform.jwt)
    .then(signJwtUser)
}

module.exports.signIn = ({ email, password }) => {
  return userModel.getByEmail(email)
    .tap(checkPassword(password))
    .then(userTransform.jwt)
    .then(signJwtUser)
}

module.exports.sign = sign
