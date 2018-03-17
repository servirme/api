const { map } = require('ramda')
const cookeryTransform = require('../transforms/cookery')
const cookeryRepository = require('../repositories/cookery')

module.exports.list = () => {
  return cookeryRepository.paginate()
    .then(map(cookeryTransform.output))
}

module.exports.show = (id) => {
  return cookeryRepository.getOneById(id)
    .then(cookeryTransform.output)
}
