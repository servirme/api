const { models } = require('./base')

module.exports.createUser = userPayload => models.User.create(userPayload)

module.exports.getByEmail = email => models.User.findOne({ where: { email } })
