const { map } = require('ramda')
const categoryTransform = require('../Transforms/CategoryTransform')
const categoryRepository = require('../Repositories/CategoryRepository')

module.exports.list = () => {
  return categoryRepository.paginate()
    .then(map(categoryTransform.output))
}

module.exports.show = (id) => {
  return categoryRepository.getOneById(id)
    .then(categoryTransform.output)
}
