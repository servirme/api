const categoryModel = require('../Models/CategoryModel')

module.exports.index = () => {
  return categoryModel.list()
    .then(categories => ({
      statusCode: 200,
      body: {
        message: 'categories.list',
        result: categories,
      },
    }))
}

module.exports.show = (req) => {
  const { params } = req
  const { id } = params

  return categoryModel.show(id)
    .then(category => ({
      statusCode: 200,
      body: {
        message: 'categories.show',
        result: category,
      },
    }))
}
