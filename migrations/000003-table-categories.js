const { DATABASE } = require('../config/constants')

const tableName = 'categories'

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
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true,
      },
      created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE,
      deleted_at: Sequelize.DATE,
    })
  },
  down(queryInterface) {
    return queryInterface.dropTable(tableName)
  },
}
