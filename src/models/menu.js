const BbPromise = require('bluebird')
const { map } = require('ramda')

const menuTransform = require('../transforms/menu')
const menuRepository = require('../repositories/menu')

module.exports.index = (establishmentId) => {
  return menuRepository.paginate(establishmentId)
    .then(map(menuTransform.output))
}

module.exports.create = (data, establishmentId) => {
  return BbPromise.resolve(data)
    .then(menuTransform.input)
    .then(transformedData => menuRepository.create(transformedData, establishmentId))
    .then(menuTransform.output)
}

module.exports.update = (id, data, establishmentId) => {
  const transformed = menuTransform.input(data)

  return menuRepository.update(id, transformed, establishmentId)
    .then(menuTransform.output)
}

module.exports.show = (id, establishmentId) => {
  return menuRepository.getOne(id, establishmentId)
    .then(menuTransform.output)
}

module.exports.destroy = (id, establishmentId) => {
  return menuRepository.destroy(id, establishmentId);
}
