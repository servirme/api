const Sequelize = require('sequelize')

module.exports.name = 'user'
module.exports.type = 'master'

module.exports.fields = {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  password: Sequelize.STRING(60),
  email: {
    type: Sequelize.STRING(60),
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  active: {
    type: Sequelize.BOOLEAN,
    defaultValue: true,
  },
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
