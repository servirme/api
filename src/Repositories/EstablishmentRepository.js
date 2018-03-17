const { database } = require('../Helpers/database')
const { DATABASE } = require('../../config/constants')
const NotFoundException = require('../Exceptions/NotFoundException')

module.exports.getOne = (id) => {
  return database.master.establishment
    .findById(id, { searchPath: DATABASE.MASTER })
    .then((resource) => {
      if (!resource) {
        throw new NotFoundException('establishment')
      }

      return resource
    })
}

module.exports.create = (data) => {
  return database.master.establishment
    .create(data)
}

module.exports.update = (id, data) => {
  return this.getOne(id)
    .then((resource) => {
      return resource.updateAttributes(data)
    })
}
