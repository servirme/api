const BbPromise = require('bluebird')
const { map } = require('ramda')

const itemTransform = require('../transforms/item')
const itemRepository = require('../repositories/item')

module.exports.index = (establishmentId) => {
  return itemRepository.paginate(establishmentId)
    .then(map(itemTransform.output))
}

module.exports.create = (data, establishmentId) => {
  return BbPromise.resolve(data)
    .then(itemTransform.input)
    .then(transformedData => itemRepository.create(transformedData, establishmentId))
    .then(itemTransform.output)
}

module.exports.update = (id, data, establishmentId) => {
  const transformed = itemTransform.input(data)

  return itemRepository.update(id, transformed, establishmentId)
    .then(itemTransform.output)
}

module.exports.show = (id, establishmentId) => {
  return itemRepository.getOne(id, establishmentId)
    .then(itemTransform.output)
}

module.exports.destroy = (id, establishmentId) => {
  return itemRepository.destroy(id, establishmentId);
}
