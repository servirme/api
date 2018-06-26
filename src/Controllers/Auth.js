const AuthModel = require('../Models/Auth')
const { removeJwtFields } = require('../helpers/jwt')

class AuthController {
  constructor({
    AuthModel: AuthModelDep = AuthModel,
    removeJwtFields: removeJwtFieldsDep = removeJwtFields,
  } = {}) {
    this.authModel = new AuthModelDep()
    this.removeJwtFields = removeJwtFieldsDep

    this.login = this.login.bind(this)
    this.register = this.register.bind(this)
    this.refreshToken = this.refreshToken.bind(this)
  }

  async login({ body }) {
    const token = await this.authModel.signIn(body)

    return {
      statusCode: 200,
      body: {
        message: 'signed.in',
        token,
      },
    }
  }

  async register({ body }) {
    const token = await this.authModel.signUp(body)

    return {
      statusCode: 201,
      body: {
        message: 'signed.up',
        token,
      },
    }
  }

  async refreshToken(req) {
    const decoded = this.removeJwtFields(req.auth)

    const token = await this.authModel.sign(decoded)

    return {
      statusCode: 200,
      body: {
        message: 'token.refresh',
        token,
      },
    }
  }

  static check() {
    return {
      statusCode: 200,
      body: {
        message: 'token.ok',
      },
    }
  }
}

module.exports = AuthController
