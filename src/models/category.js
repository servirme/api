const categoryTransform = require('../transforms/category')
const categoryRepository = require('../repositories/category')

module.exports.list = () => categoryRepository.paginate()
  .map(categoryTransform.output)

module.exports.show = id => categoryRepository.getOneById(id)
  .then(categoryTransform.output)
