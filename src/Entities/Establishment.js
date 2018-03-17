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
  landlinePhone: {
    field: 'landline_phone',
    type: Sequelize.STRING,
  },
  street: Sequelize.STRING,
  number: Sequelize.STRING,
  district: Sequelize.STRING,
  city: Sequelize.STRING,
  state: Sequelize.STRING,
  categoryId: {
    field: 'category_id',
    type: Sequelize.INTEGER,
  },
  createdAt: {
    field: 'created_at',
    type: Sequelize.DATE,
  },
  updatedAt: {
    field: 'updated_at',
    type: Sequelize.DATE,
  },
  deletedAt: {
    field: 'deleted_at',
    type: Sequelize.DATE,
  },
}

module.exports.config = {
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  deletedAt: 'deleted_at',
  paranoid: true,
}
