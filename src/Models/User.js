const UserRepository = require('../Repositories/User')
const { hashPassword } = require('../helpers/security')
const { checkConflict, checkExists } = require('../helpers/model')

class UserModel {
  constructor({
    userRepository = new UserRepository(),
    hashPassword: hashPasswordDep = hashPassword,
    checkConflict: checkConflictDep = checkConflict,
    checkExists: checkExistsDep = checkExists,
  } = {}) {
    this.userRepository = userRepository
    this.hashPassword = hashPasswordDep
    this.checkConflict = checkConflictDep
    this.checkExists = checkExistsDep
  }

  async createUser({ email, password }) {
    try {
      const hashedPassword = await this.hashPassword(password)

      return this.userRepository.createUser({
        email,
        password: hashedPassword,
      })
    } catch (error) {
      return this.checkConflict('user', error)
    }
  }

  async getByEmail(email) {
    const user = await this.userRepository.getByEmail(email)

    this.checkExists('user', user)

    return user
  }
}

module.exports = UserModel
