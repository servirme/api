const userModel = require('./UserModel')

module.exports.signUp = (credentials) => {
  return userModel.createUser(credentials)
}

module.exports.signIn = (credentials) => {
  return userModel.authenticateUser(credentials)
}
