const Sequelize = require('sequelize')

module.exports.name = 'item'
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
  section_id: {
    defaultValue: true,
    type: Sequelize.INTEGER,
  },
  name: Sequelize.STRING,
  short_description: Sequelize.STRING,
  long_description: Sequelize.TEXT,
  image_url: Sequelize.STRING,
  ingredients: Sequelize.TEXT,
  price: Sequelize.DECIMAL(10, 2),
  promotion_price: Sequelize.DECIMAL(10, 2),
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
