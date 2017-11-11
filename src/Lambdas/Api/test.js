const publisher = require('./_publisher')
const TestController = require('../../Controllers/TestController')

const exposedActions = [
  'test',
]

module.exports = publisher(TestController, exposedActions)
