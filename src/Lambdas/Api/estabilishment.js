const publisher = require('./_publisher')
const EstabilishmentController = require('../../Controllers/EstabilishmentController')
const { adminAuth, publicAuth } = require('../../Middlewares')

const exposedActions = {
  create: {
    middlewares: adminAuth,
  },
  update: {
    middlewares: adminAuth,
  },
  show: {
    middlewares: publicAuth,
  },
}

module.exports = publisher(EstabilishmentController, exposedActions)
