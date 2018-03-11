const { map } = require('ramda')
const categoryTransform = require('../transforms/category')
const categoryRepository = require('../repositories/category')

module.exports.list = () => {
  return categoryRepository.paginate()
    .then(map(categoryTransform.output))
}

module.exports.show = (id) => {
  return categoryRepository.getOneById(id)
    .then(categoryTransform.output)
}
