const { database, getClientDatabase } = require('../helpers/database')
const NotFoundException = require('../Errors/NotFound')

module.exports.paginate = (establishmentId) => {
  return database.client.section
    .findAll({ searchPath: getClientDatabase(establishmentId) })
}

module.exports.getOne = (id, establishmentId) => {
  return database.client.section
    .findById(id, { searchPath: getClientDatabase(establishmentId) })
    .then((resource) => {
      if (!resource) {
        throw new NotFoundException('section')
      }

      return resource
    })
}

module.exports.create = (data, establishmentId) => {
  return database.client.section
    .create(data, { searchPath: getClientDatabase(establishmentId) })
}

module.exports.update = (id, data, establishmentId) => {
  return this.getOne(id, establishmentId)
    .then((resource) => {
      return resource.updateAttributes(data)
    })
}

module.exports.destroy = (id, establishmentId) => {
  return this.getOne(id, establishmentId)
    .then((resource) => {
      return resource.destroy()
    })
}
