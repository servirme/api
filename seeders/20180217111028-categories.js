const { DATABASE } = require('../config/constants')

const table = { tableName: 'categories', schema: DATABASE.MASTER }

module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert(table, [
      {
        active: true,
        name: 'Adega',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        active: true,
        name: 'Bar',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        active: true,
        name: 'Barraca',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        active: true,
        name: 'Batataria',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        active: true,
        name: 'Botequim',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        active: true,
        name: 'Café',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        active: true,
        name: 'Cervejaria',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        active: true,
        name: 'Churrascaria',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        active: true,
        name: 'Doceria & Padaria',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        active: true,
        name: 'Empadaria',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        active: true,
        name: 'Fast Food',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        active: true,
        name: 'Food Truck',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        active: true,
        name: 'Hamburgueria',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        active: true,
        name: 'Kebaberia',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        active: true,
        name: 'Lanchonete',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        active: true,
        name: 'Pastelaria',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        active: true,
        name: 'Pizzaria',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        active: true,
        name: 'Restaurante',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        active: true,
        name: 'Sorveteria',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        active: true,
        name: 'Temakeria',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ])
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete(table, null)
  },
}
