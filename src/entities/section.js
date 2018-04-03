const Sequelize = require('sequelize')

module.exports.name = 'section'
module.exports.type = 'client'

module.exports.fields = {
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: Sequelize.INTEGER,
  },
  menu_id: Sequelize.INTEGER,
  active: {
    defaultValue: true,
    type: Sequelize.TINYINT,
  },
  name: Sequelize.STRING,
  icon: Sequelize.STRING,
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
