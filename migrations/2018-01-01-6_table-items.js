const runClients = require('./helpers/client')

const tableName = 'items'

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
      section_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      short_description: {
        type: Sequelize.STRING(100),
      },
      long_description: {
        type: Sequelize.TEXT,
      },
      image_url: {
        type: Sequelize.STRING(255),
      },
      ingredients: {
        type: Sequelize.TEXT,
      },
      price: {
        type: Sequelize.DECIMAL(10, 2),
      },
      promotion_price: {
        type: Sequelize.DECIMAL(10, 2),
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
