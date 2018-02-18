const BbPromise = require('bluebird')

const NotFoundException = require('../Exceptions/NotFoundException')
const userRepository = require('../Repositories/UserRepository')
const { hashPassword } = require('../Helpers/security')
const { checkConflict } = require('../Helpers/model')

const checkUserExists = (user) => {
  if (!user) {
    throw new NotFoundException('user')
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
