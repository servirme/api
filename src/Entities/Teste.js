const Sequelize = require('sequelize')

module.exports.name = 'teste'
module.exports.type = 'client'

module.exports.fields = {
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: Sequelize.INTEGER,
  },
  name: Sequelize.STRING,
}

module.exports.config = {
  timestamps: false,
  tableName: 'teste',
}
