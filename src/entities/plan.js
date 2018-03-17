const Sequelize = require('sequelize')

module.exports.name = 'plan'
module.exports.type = 'master'

module.exports.fields = {
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: Sequelize.INTEGER,
  },
  name: Sequelize.STRING,
  description: Sequelize.TEXT,
  price: Sequelize.DECIMAL(10, 2),
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
