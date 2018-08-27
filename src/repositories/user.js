const { models } = require('./base')

module.exports.createUser = ({ email, password }) => models.master.user
  .create({
    email,
    password,
  })

module.exports.getByEmail = email => models.master.user
  .findOne({
    where: { email },
  })
