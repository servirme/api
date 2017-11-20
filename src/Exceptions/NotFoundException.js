const Exception = require('./Exception')
const { notFound } = require('../../config/errorCodes')

const notFoundSufix = 'not-found'

class NotFoundException extends Exception {
  constructor(resourceName = 'generic') {
    const message = `${notFoundSufix}.${resourceName}`
    super(404, notFound[resourceName], message)
  }
}

module.exports = NotFoundException
