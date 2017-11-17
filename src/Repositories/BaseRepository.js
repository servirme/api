const NotImplementedException = require('../Exceptions/NotImplementedException')

class BaseRepository {
  constructor() {
    this._alias = this.constructor.name.replace('Repository', '')

    this.setPageLimit(50)
  }

  setPageLimit(pageLimit) {
    this.pageLimit = pageLimit
  }

  create() { // eslint-disable-line
    throw new NotImplementedException(__filename, 'create')
  }

  update() { // eslint-disable-line
    throw new NotImplementedException(__filename, 'update')
  }

  getOne() { // eslint-disable-line
    throw new NotImplementedException(__filename, 'getOne')
  }

  getAll() { // eslint-disable-line
    throw new NotImplementedException(__filename, 'getAll')
  }

  remove() { // eslint-disable-line
    throw new NotImplementedException(__filename, 'remove')
  }
}

module.exports = BaseRepository

