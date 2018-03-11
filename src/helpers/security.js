const bcrypt = require('bcrypt')

const { SALT } = process.env

module.exports.hashPassword = (string) => {
  return bcrypt.hash(string, SALT)
}

module.exports.checkHashPassword = (plainTextPassword, hash) => {
  return bcrypt.compare(plainTextPassword, hash)
}
