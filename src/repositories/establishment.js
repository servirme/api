const { models } = require('./base')
const { DATABASE } = require('../../config/constants')

const getOne = id => models.master.establishment
  .findById(id, { searchPath: DATABASE.MASTER })
module.exports.getOne = getOne

module.exports.create = data => models.master.establishment.create(data)

module.exports.update = async (id, data) => {
  const resource = await getOne(id)

  return resource.updateAttributes(data)
}

module.exports.activate = establishment => establishment.updateAttributes({
  active: true,
})
