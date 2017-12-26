const { DATABASE } = require('../config/constants')

const tableName = 'estabilishments'

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
      },
      active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      site: {
        type: Sequelize.STRING(40),
      },
      slug: {
        type: Sequelize.STRING(20),
        unique: true,
      },
      email: {
        type: Sequelize.STRING(60),
        validate: {
          isEmail: true,
        },
      },
      plan_id: {
        type: Sequelize.INTEGER,
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
