const dateISO = require('../lib/utils/date').dateISO
const InternalException = require('../Exceptions/InternalException')
const NotImplementedException = require('../Exceptions/NotImplementedException')

class BaseRepository {
  constructor() {
    this._alias = this.constructor.name.replace('Repository', '')

    this.setPageLimit(50)
  }

  setPageLimit(pageLimit) {
    this.pageLimit = pageLimit
  }

  // remove(...keys) {
  //   switch (this.deleteType) {
  //     case DELETE_TYPE.VIRTUAL:
  //       return this._virtualDelete(keys)
  //     case DELETE_TYPE.REAL:
  //       return this._realDelete(keys)
  //     default:
  //       throw new InternalException(`The resource '${this._alias}' can't be deleted because it doesn't have a delete type configured`)
  //   }
  // }

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

