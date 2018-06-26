const categoryTransform = require('../transforms/category')
const CategoryRepository = require('../Repositories/Category')

class CategoryModel {
  constructor({
    categoryRepository = new CategoryRepository(),
  } = {}) {
    this.categoryRepository = categoryRepository
  }

  list() {
    return this.categoryRepository.paginate()
      .map(categoryTransform.output)
  }

  show(id) {
    return this.categoryRepository.getOneById(id)
      .then(categoryTransform.output)
  }
}

module.exports = CategoryModel
