const { database } = require('../helpers/database')

module.exports.createUser = ({ email, password }) => {
  return database.master.user
    .create({
      email,
      password,
    })
}

module.exports.getByEmail = (email) => {
  return database.master.user
    .findOne({
      where: {
        email,
      },
    })
}
