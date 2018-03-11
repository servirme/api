const Sequelize = require('sequelize')

module.exports.name = 'categories'
module.exports.type = 'master'

module.exports.fields = {
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: Sequelize.INTEGER,
  },
  name: {
    type: Sequelize.STRING,
    unique: true,
  },
  active: {
    defaultValue: true,
    type: Sequelize.TINYINT,
  },
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
