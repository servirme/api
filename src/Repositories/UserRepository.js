const { database } = require('../Helpers/database')

module.exports.createUser = ({ email, password }) => {
  return database.master.user
    .create({
      email,
      password,
    })
}

module.exports.getOne = (email) => {
  return database.master.user
    .findOne({
      where: {
        email,
      },
    })
}
