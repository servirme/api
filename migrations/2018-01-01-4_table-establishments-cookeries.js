const { DATABASE } = require('../config/constants')

const table = {
  schema: DATABASE.MASTER,
  tableName: 'establishments_cookeries',
}

module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable(table, {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      cookery_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      establishment_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    })
  },
  down(queryInterface) {
    return queryInterface.dropTable(table)
  },
}
