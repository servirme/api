const NotFoundException = require('../Exceptions/NotFoundException')
const ConflictException = require('../Exceptions/ConflictException')
const InvalidException = require('../Exceptions/InvalidException')
const userRepository = require('../Repositories/UserRepository')
const { checkHashPassword, hashPassword } = require('../Helpers/security')

const checkUserExists = (user) => {
  if (!user) {
    throw new NotFoundException('user')
  }
}

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

module.exports.createUser = ({ email, password }) => {
  return hashPassword(password)
    .then((hashedPassword) => {
      return userRepository.createUser({
        email,
        password: hashedPassword,
      })
    })
    .catch((err) => {
      if (err.name === 'SequelizeUniqueConstraintError') {
        throw new ConflictException('user')
      }
      throw err
    })
}

module.exports.authenticateUser = ({ email, password }) => {
  return userRepository.getOne(email)
    .tap(checkUserExists)
    .tap(checkPassword(password))
}
