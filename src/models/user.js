const BbPromise = require('bluebird')

const NotFoundError = require('../Errors/NotFound')
const userRepository = require('../repositories/user')
const { hashPassword } = require('../helpers/security')
const { checkConflict } = require('../helpers/model')

const checkUserExists = (user) => {
  if (!user) {
    throw new NotFoundError('user')
  }
}

module.exports.createUser = ({ email, password }) => {
  return BbPromise.resolve(password)
    .then(hashPassword)
    .then((hashedPassword) => {
      return userRepository.createUser({
        email,
        password: hashedPassword,
      })
    })
    .catch(checkConflict('user'))
}

module.exports.getByEmail = email =>
  userRepository.getByEmail(email)
    .tap(checkUserExists)
