const runClients = require('./helpers/client')

const tableName = 'sections'

module.exports = {
  up(queryInterface, Sequelize) {
    const migrationUp = schema => queryInterface.createTable({
      schema,
      tableName,
    }, {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      menu_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      icon: {
        type: Sequelize.STRING(50),
      },
      created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE,
      deleted_at: Sequelize.DATE,
    })

    return runClients(queryInterface, migrationUp)
  },
  down(queryInterface) {
    const migrationDown = schema => queryInterface.dropTable({
      schema,
      tableName,
    })

    return runClients(queryInterface, migrationDown)
  },
}
