const { map } = require('ramda')
const cookeryTransform = require('../Transforms/CookeryTransform')
const cookeryRepository = require('../Repositories/CookeryRepository')

module.exports.list = () => {
  return cookeryRepository.paginate()
    .then(map(cookeryTransform.output))
}

module.exports.show = (id) => {
  return cookeryRepository.getOneById(id)
    .then(cookeryTransform.output)
}
