const Sequelize = require('sequelize')

module.exports.name = 'establishment'
module.exports.type = 'master'

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
  logo: Sequelize.STRING,
  slug: Sequelize.STRING,
  email: Sequelize.STRING,
  site: Sequelize.STRING,
  landline_phone: Sequelize.STRING,
  street: Sequelize.STRING,
  number: Sequelize.STRING,
  district: Sequelize.STRING,
  city: Sequelize.STRING,
  state: Sequelize.STRING,
  category_id: Sequelize.INTEGER,
  plan_id: Sequelize.INTEGER,
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
