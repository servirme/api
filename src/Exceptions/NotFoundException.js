const Exception = require('./Exception')
const { notFound } = require('../../config/errorCodes')

const notFoundSufix = 'not-found'

class NotFoundException extends Exception {
  constructor(resourceName = 'generic') {
    const message = `${resourceName}-${notFoundSufix}`
    super(404, notFound[resourceName], message)
  }
}

module.exports = NotFoundException
