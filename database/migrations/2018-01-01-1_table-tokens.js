const table = {
  tableName: 'tokens',
}

module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable(table, {
      id: {
        primaryKey: true,
        type: Sequelize.STRING(),
      },
      created_at: Sequelize.DATE,
    })
  },
  down(queryInterface) {
    return queryInterface.dropTable(table)
  },
}
