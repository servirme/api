const publisher = require('./_publisher')
const AuthController = require('../../Controllers/AuthController')
const { noAuth } = require('../../Middlewares')

const exposedActions = {
  signIn: {
    middlewares: noAuth,
  },
  signUp: {
    middlewares: noAuth,
  },
}

module.exports = publisher(AuthController, exposedActions)
