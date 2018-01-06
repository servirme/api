const { DATABASE } = require('../config/constants')

const { MASTER, BASE_CLIENT } = DATABASE

module.exports = {
  up(queryInterface) {
    return queryInterface.createSchema(BASE_CLIENT)
      .then(() => queryInterface.createSchema(MASTER))
  },
  down(queryInterface) {
    return queryInterface.dropSchema(BASE_CLIENT)
      .then(() => queryInterface.dropSchema(MASTER))
  },
}
