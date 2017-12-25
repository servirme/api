const Sequelize = require('sequelize')

module.exports.name = 'estabilishment'
module.exports.type = 'admin'

module.exports.fields = {
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: Sequelize.INTEGER,
  },
  name: Sequelize.STRING,
  site: Sequelize.STRING,
  slug: Sequelize.STRING,
  email: Sequelize.STRING,
  plan_id: Sequelize.INTEGER,
  active: Sequelize.TINYINT,
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

// module.exports.associate = (entity, entities) => {
//   const { user } = entities
//
//   entity.belongsTo(user)
// }
