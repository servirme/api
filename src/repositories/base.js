const { models, sequelize, Op } = require('../helpers/database')

module.exports.models = models
module.exports.Op = Op
module.exports.getTransaction = () => sequelize.transaction()
