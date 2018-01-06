const { DATABASE } = require('../config/constants')

const tableName = 'users'

module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable({
      schema: DATABASE.MASTER,
      tableName,
    }, {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      email: {
        type: Sequelize.STRING(60),
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: Sequelize.STRING(60),
      },
      active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE,
      deleted_at: Sequelize.DATE,
    })
  },
  down(queryInterface) {
    return queryInterface.dropTable({
      schema: DATABASE.MASTER,
      tableName,
    })
  },
}
