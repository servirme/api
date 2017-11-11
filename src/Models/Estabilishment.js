const Sequelize = require('sequelize')

module.exports = (db) => {
  return db.sequelize.define('Estabilishment', {
    id: Sequelize,
    name: Sequelize,
    active: Sequelize,
    site: Sequelize,
    slug: Sequelize,
    email: Sequelize,
    plan_id: Sequelize,
    created_at: Sequelize,
    updated_at: Sequelize,
    deleted_at: Sequelize,
  }, {
    indexes: [{
      fields: ['company_id'],
    }, {
      fields: ['document_type'],
    }, {
      fields: ['document_number'],
    }, {
      fields: ['email'],
    }],
    hooks: db.eshelper.sequelizeHooksBuilder(),
    instanceMethods: {
      _esObjectType: 'customer',
      _esParentResponsesReindexingRules: {
        transaction: parentReindexingRules,
        subscription: parentReindexingRules,
      },
      esIndex: db.eshelper.sequelizeEsIndexBuilder(responseObjectBuilder),
    },
    classMethods: {
      responseObjectBuilder,
      buildMappings,
    },
  })
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
