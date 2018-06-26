const CategoryModel = require('../Models/Category')

class CategoryController {
  constructor({
    CategoryModel: CategoryModelDep = CategoryModel,
  } = {}) {
    this.categoryModel = new CategoryModelDep()

    this.index = this.index.bind(this)
    this.show = this.show.bind(this)
  }

  async index() {
    const categories = await this.categoryModel.list()

    return {
      statusCode: 200,
      body: {
        message: 'categories.list',
        result: categories,
      },
    }
  }

  async show({ params }) {
    const { id } = params

    const category = this.categoryModel.show(id)

    return {
      statusCode: 200,
      body: {
        message: 'categories.show',
        result: category,
      },
    }
  }
}

module.exports = CategoryController

