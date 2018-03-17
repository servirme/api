const BbPromise = require('bluebird')

const establishmentTransform = require('../Transforms/EstablishmentTransform')
const establishmentRepository = require('../Repositories/EstablishmentRepository')

module.exports.createEstablishment = (establishmentData) => {
  return BbPromise.resolve(establishmentData)
    .then(establishmentTransform.input)
    .then(establishmentRepository.create)
    .then(establishmentTransform.output)
}

module.exports.updateEstablishment = (id, establishmentData) => {
  const transformed = establishmentTransform.input(establishmentData)

  return establishmentRepository.update(id, transformed)
    .then(establishmentTransform.output)
}

module.exports.showEstablishment = (id) => {
  return establishmentRepository.getOne(id)
    .then(establishmentTransform.output)
}
