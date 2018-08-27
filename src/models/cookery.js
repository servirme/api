const cookeryTransform = require('../transforms/cookery')
const cookeryRepository = require('../repositories/cookery')

module.exports.list = () => cookeryRepository.paginate()
  .map(cookeryTransform.output)

module.exports.show = id => cookeryRepository.getOneById(id)
  .then(cookeryTransform.output)
