const itemModel = require('../models/item')
const itemValidator = require('../validators/item')

module.exports.index = (req) => {
  const establishmentId = req.auth.establishment.id

  return itemModel.index(establishmentId)
    .then(items => ({
      statusCode: 200,
      body: {
        message: 'items.list',
        result: items,
      },
    }))
}

module.exports.create = (req) => {
  const { body } = itemValidator.create(req)
  const establishmentId = req.auth.establishment.id

  return itemModel.create(body, establishmentId)
    .then(item => ({
      statusCode: 201,
      body: {
        message: 'items.created',
        result: item,
      },
    }))
}

module.exports.update = (req) => {
  const { body, params } = itemValidator.update(req)
  const establishmentId = req.auth.establishment.id

  return itemModel.update(params.id, body, establishmentId)
    .then(item => ({
      statusCode: 200,
      body: {
        message: 'items.updated',
        result: item,
      },
    }))
}

module.exports.show = (req) => {
  const { params } = itemValidator.update(req)
  const establishmentId = req.auth.establishment.id

  return itemModel.show(params.id, establishmentId)
    .then(item => ({
      statusCode: 200,
      body: {
        message: 'items.show',
        result: item,
      },
    }))
}

module.exports.destroy = (req) => {
  const { params } = itemValidator.update(req)
  const establishmentId = req.auth.establishment.id

  return itemModel.destroy(params.id, establishmentId)
    .then(() => ({
      statusCode: 200,
      body: {
        message: 'items.deleted',
      },
    }))
}
