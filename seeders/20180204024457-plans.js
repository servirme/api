const { DATABASE } = require('../config/constants')

const tableName = { tableName: 'plans', schema: DATABASE.MASTER }

module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert(tableName, [
      {
        active: true,
        name: 'Básico',
        description: 'Recursos essenciais para seu estabelecimento',
        price: 24.90,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ])
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete(tableName, null)
  },
}
