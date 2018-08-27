const categoryModel = require('../models/category')

module.exports.index = async () => {
  const categories = await categoryModel.list()

  return {
    statusCode: 200,
    body: {
      message: 'categories.list',
      result: categories,
    },
  }
}

module.exports.show = async ({ params }) => {
  const { id } = params

  const category = categoryModel.show(id)

  return {
    statusCode: 200,
    body: {
      message: 'categories.show',
      result: category,
    },
  }
}
