const UserModel = require('./User')
const userTransform = require('../transforms/user')
const InvalidError = require('../Errors/Invalid')
const { checkHashPassword } = require('../helpers/security')
const { sign } = require('../helpers/jwt')
const { AUTH } = require('../../config/constants')

class AuthModel {
  constructor({
    UserModel: UserModelDep = UserModel,
    InvalidError: InvalidErrorDep = InvalidError,
    userTransform: userTransformDep = userTransform,
    checkHashPassword: checkHashPasswordDep = checkHashPassword,
    sign: signDep = sign,
  } = {}) {
    this.InvalidError = InvalidErrorDep
    this.userModel = new UserModelDep()
    this.userTransform = userTransformDep

    this.checkHashPassword = checkHashPasswordDep
    this.sign = signDep
  }

  async signJwtUser(user) {
    return this.sign({ type: AUTH.LEVELS.ADMIN, user })
  }

  async checkPassword(plainTextPassword, user) {
    const valid = await this.checkHashPassword(
      plainTextPassword,
      user.password
    )

    if (!valid) {
      throw new this.InvalidError('password')
    }
  }

  async signUp(credentials) {
    const createdUser = await this.userModel.createUser(credentials)
    const jwtData = this.userTransform.jwt(createdUser)

    return this.signJwtUser(jwtData)
  }

  async signIn({ email, password }) {
    const user = await this.userModel.getByEmail(email)

    await this.checkPassword(password, user)

    const jwtData = this.userTransform.jwt(user)

    return this.signJwtUser(jwtData)
  }
}

module.exports = AuthModel
