const menuModel = require('../models/menu')
const menuValidator = require('../validators/menu')

module.exports.index = (req) => {
  const establishmentId = req.auth.establishment.id

  return menuModel.index(establishmentId)
    .then(menus => ({
      statusCode: 200,
      body: {
        message: 'menus.list',
        result: menus,
      },
    }))
}

module.exports.create = (req) => {
  const { body } = menuValidator.create(req)
  const establishmentId = req.auth.establishment.id

  return menuModel.create(body, establishmentId)
    .then(menu => ({
      statusCode: 201,
      body: {
        message: 'menus.created',
        result: menu,
      },
    }))
}

module.exports.update = (req) => {
  const { body, params } = menuValidator.update(req)
  const establishmentId = req.auth.establishment.id

  return menuModel.update(params.id, body, establishmentId)
    .then(menu => ({
      statusCode: 200,
      body: {
        message: 'menus.updated',
        result: menu,
      },
    }))
}

module.exports.show = (req) => {
  const { params } = menuValidator.show(req)
  const establishmentId = req.auth.establishment.id

  return menuModel.show(params.id, establishmentId)
    .then(menu => ({
      statusCode: 200,
      body: {
        message: 'menus.show',
        result: menu,
      },
    }))
}

module.exports.destroy = (req) => {
  const { params } = menuValidator.destroy(req)
  const establishmentId = req.auth.establishment.id

  return menuModel.destroy(params.id, establishmentId)
    .then(() => ({
      statusCode: 200,
      body: {
        message: 'menus.deleted',
      },
    }))
}
