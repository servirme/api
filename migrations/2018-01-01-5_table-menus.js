const runClients = require('./helpers/client')

const tableName = 'menus'

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
      name: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
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