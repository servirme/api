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
      active: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      logo: Sequelize.STRING(150),
      street: Sequelize.STRING(50),
      number: Sequelize.STRING(10),
      district: Sequelize.STRING(50),
      city: Sequelize.STRING(50),
      state: Sequelize.STRING(50),
      slug: {
        type: Sequelize.STRING(20),
        unique: true,
      },
      site: Sequelize.STRING(50),
      landline_phone: Sequelize.STRING(30),
      email: {
        type: Sequelize.STRING(60),
        validate: {
          isEmail: true,
        },
      },
      category_id: Sequelize.INTEGER,
      plan_id: Sequelize.INTEGER,
      created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE,
      deleted_at: Sequelize.DATE,
    })
  },
  down(queryInterface) {
    return queryInterface.dropTable(table)
  },
}
