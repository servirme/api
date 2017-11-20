const Sequelize = require('sequelize')

module.exports.fields = {
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: Sequelize.INTEGER,
  },
  name: Sequelize.STRING,
  active: Sequelize.TINYINT,
  site: Sequelize.STRING,
  slug: Sequelize.STRING,
  email: Sequelize.STRING,
  plan_id: Sequelize.INTEGER,
  created_at: Sequelize.DATE,
  updated_at: Sequelize.DATE,
  deleted_at: Sequelize.DATE,
}

module.exports.config = {
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  deletedAt: 'deleted_at',
  paranoid: true,
}

module.exports.associate = (model, database) => {
  const {
    address,
    phone,
    document,
  } = database

  model.hasMany(address)
  model.hasMany(phone)
  model.hasMany(document, {
    as: 'documents',
  })
}
