const { DATABASE } = require('../config/constants')

const table = {
  schema: DATABASE.MASTER,
  tableName: 'establishments',
}

module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable(table, {
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
      logo: {
        type: Sequelize.STRING(150),
      },
      street: {
        type: Sequelize.STRING(50),
      },
      number: {
        type: Sequelize.STRING(10),
      },
      district: {
        type: Sequelize.STRING(50),
      },
      city: {
        type: Sequelize.STRING(50),
      },
      state: {
        type: Sequelize.STRING(50),
      },
      slug: {
        type: Sequelize.STRING(20),
        unique: true,
      },
      site: {
        type: Sequelize.STRING(50),
      },
      landline_phone: {
        type: Sequelize.STRING(30),
      },
      email: {
        type: Sequelize.STRING(60),
        validate: {
          isEmail: true,
        },
      },
      category_id: {
        type: Sequelize.INTEGER,
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
    return queryInterface.dropTable(table)
  },
}
