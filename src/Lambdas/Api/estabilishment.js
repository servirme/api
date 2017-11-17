const publisher = require('./_publisher')
const EstabilishmentController = require('../../Controllers/EstabilishmentController')

const exposedActions = [
  'create',
  'update',
]

module.exports = publisher(EstabilishmentController, exposedActions)
