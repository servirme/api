const { models } = require('./base')

const getOne = id => models.Establishment.findById(id)
module.exports.getOne = getOne

module.exports.create = data => models.Establishment.create(data)

module.exports.update = async (id, data) => {
  const resource = await getOne(id)

  return resource.updateAttributes(data)
}

module.exports.activate = establishment => establishment.updateAttributes({
  active: true,
})
