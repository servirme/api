const publisher = require('./_publisher')
const UserController = require('../../Controllers/UserController')

const exposedActions = [
  'login',
  'show',
]

module.exports = publisher(UserController, exposedActions)
