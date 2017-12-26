const estabilishmentTransform = require('../Transforms/EstabilishmentTransform')
const estabilishmentRepository = require('../Repositories/EstabilishmentRepository')

module.exports.createEstabilishment = (estabilishmentData) => {
  const transformed = estabilishmentTransform.input(estabilishmentData)

  return estabilishmentRepository.create(transformed)
    .then(estabilishmentTransform.output)
}

module.exports.updateEstabilishment = (id, estabilishmentData) => {
  const transformed = estabilishmentTransform.input(estabilishmentData)

  return estabilishmentRepository.update({
    id,
  }, transformed)
    .then(estabilishmentTransform.output)
}

module.exports.showEstabilishment = (id) => {
  const condition = { id }

  return estabilishmentRepository.getOne(condition)
    .then(estabilishmentTransform.output)
}
