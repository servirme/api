const Sequelize = require('sequelize')

module.exports.name = 'menu'
module.exports.type = 'client'

module.exports.fields = {
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: Sequelize.INTEGER,
  },
  active: {
    defaultValue: true,
    type: Sequelize.TINYINT,
  },
  name: Sequelize.STRING,
  created_at: Sequelize.DATE,
  updated_at: Sequelize.DATE,
  deleted_at: Sequelize.DATE,
}

module.exports.config = {
  timestamps: true,
  underscored: true,
  deletedAt: 'deleted_at',
  paranoid: true,
}
