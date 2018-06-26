const { DATABASE } = require('../config/constants')

const table = { tableName: 'cookeries', schema: DATABASE.MASTER }

module.exports = {
  up: queryInterface => queryInterface.bulkInsert(table, [
    {
      active: true,
      name: 'Açaí',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      active: true,
      name: 'Árabe',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      active: true,
      name: 'Asiática',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      active: true,
      name: 'Brasileira',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      active: true,
      name: 'Cachorro-Quente',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      active: true,
      name: 'Cafeteria',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      active: true,
      name: 'Churrasco',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      active: true,
      name: 'Comida Caseira',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      active: true,
      name: 'Cupcakes',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      active: true,
      name: 'Diet & Light',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      active: true,
      name: 'Empada',
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
      name: 'Frango Frito',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      active: true,
      name: 'Frutos do Mar',
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
      name: 'Japonesa',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      active: true,
      name: 'Mexicana',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      active: true,
      name: 'Mineira',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      active: true,
      name: 'Nordestina',
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
      name: 'Salgados',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      active: true,
      name: 'Self-Service',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      active: true,
      name: 'Sem Glúten',
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
      name: 'Steakhouse',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      active: true,
      name: 'Sucos',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      active: true,
      name: 'Tortas',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      active: true,
      name: 'Vegana',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      active: true,
      name: 'Vegetariana',
      created_at: new Date(),
      updated_at: new Date(),
    },
  ]),

  down: queryInterface => queryInterface.bulkDelete(table, null),
}
