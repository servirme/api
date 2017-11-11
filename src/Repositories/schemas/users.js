const userTable = require('../../../config/resources').tables.users

module.exports.table = userTable

module.exports.fields = {
  id: {
    primaryKey: true,
  },
}

module.exports.config = {

}
