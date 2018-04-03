const sectionModel = require('../models/section')
const sectionValidator = require('../validators/section')

module.exports.index = (req) => {
  const establishmentId = req.auth.establishment.id

  return sectionModel.index(establishmentId)
    .then(sections => ({
      statusCode: 200,
      body: {
        message: 'sections.list',
        result: sections,
      },
    }))
}

module.exports.create = (req) => {
  const { body } = sectionValidator.create(req)
  const establishmentId = req.auth.establishment.id

  return sectionModel.create(body, establishmentId)
    .then(section => ({
      statusCode: 201,
      body: {
        message: 'sections.created',
        result: section,
      },
    }))
}

module.exports.update = (req) => {
  const { body, params } = sectionValidator.update(req)
  const establishmentId = req.auth.establishment.id

  return sectionModel.update(params.id, body, establishmentId)
    .then(section => ({
      statusCode: 200,
      body: {
        message: 'sections.updated',
        result: section,
      },
    }))
}

module.exports.show = (req) => {
  const { params } = sectionValidator.show(req)
  const establishmentId = req.auth.establishment.id

  return sectionModel.show(params.id, establishmentId)
    .then(section => ({
      statusCode: 200,
      body: {
        message: 'sections.show',
        result: section,
      },
    }))
}

module.exports.destroy = (req) => {
  const { params } = sectionValidator.destroy(req)
  const establishmentId = req.auth.establishment.id

  return sectionModel.destroy(params.id, establishmentId)
    .then(() => ({
      statusCode: 200,
      body: {
        message: 'sections.deleted',
      },
    }))
}
