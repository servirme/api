const { DATABASE } = require('../config/constants')

const tableName = 'plans'

module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable({
      tableName,
      schema: DATABASE.MASTER,
    }, {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING(30),
        allowNull: false,
      },
      price: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
    })
  },
  down(queryInterface) {
    return queryInterface.dropTable(tableName)
  },
}
