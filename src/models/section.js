const BbPromise = require('bluebird')
const { map } = require('ramda')

const sectionTransform = require('../transforms/section')
const sectionRepository = require('../repositories/section')

module.exports.index = (establishmentId) => {
  return sectionRepository.paginate(establishmentId)
    .then(map(sectionTransform.output))
}

module.exports.create = (data, establishmentId) => {
  return BbPromise.resolve(data)
    .then(sectionTransform.input)
    .then(transformedData => sectionRepository.create(transformedData, establishmentId))
    .then(sectionTransform.output)
}

module.exports.update = (id, data, establishmentId) => {
  const transformed = sectionTransform.input(data)

  return sectionRepository.update(id, transformed, establishmentId)
    .then(sectionTransform.output)
}

module.exports.show = (id, establishmentId) => {
  return sectionRepository.getOne(id, establishmentId)
    .then(sectionTransform.output)
}

module.exports.destroy = (id, establishmentId) => {
  return sectionRepository.destroy(id, establishmentId);
}
