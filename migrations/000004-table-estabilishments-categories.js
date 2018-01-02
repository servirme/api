const { DATABASE } = require('../config/constants')

const tableName = 'estabilishments_categories'

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
      category_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      estabilishment_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    })
  },
  down(queryInterface) {
    return queryInterface.dropTable(tableName)
  },
}
