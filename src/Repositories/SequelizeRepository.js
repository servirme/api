const Sequelize = require('sequelize')
const BaseRepository = require('./BaseRepository')
const ConflictException = require('../Exceptions/ConflictException')

const offline = process.env.OFFLINE === 'true'
const host = process.env.DATABASE_HOST
const database = process.env.DATABASE_NAME
const username = process.env.DATABASE_USERNAME
const password = process.env.DATABASE_PASSWORD

const sequelize = new Sequelize(database, username, password, {
  host,
  dialect: offline ? 'sqlite' : 'mysql',
  logging: process.env.NODE_ENV !== 'prod' && console.log, // eslint-disable-line no-console
  operatorsAliases: Sequelize.Op,
})

class SequelizeRepository extends BaseRepository {
  constructor({ name, fields, config = {} }) {
    super()
    this.schema = sequelize.define(
      name,
      fields,
      config
    )

    if (offline) {
      this.schema.sync()
    }
  }

  create(payload, options = {}) {
    return this.schema.create(payload, options)
      .catch((err) => {
        if (err.name === 'SequelizeUniqueConstraintError') {
          throw new ConflictException(this._alias)
        }
        return Promise.reject(err)
      })
  }

  update(condition, payload, options = {}) {
    options.where = condition

    return this.schema.update(payload, options)
  }

  getOne(condition, options = {}) {
    options.where = condition

    return this.schema.findOne(options)
  }

  getAll(condition, options = {}) {
    options.where = condition
    options.page = options.page || 1
    options.limit = options.limit || this.pageLimit
    options.offset = (options.page - 1) * options.limit

    return this.schema.findAndCountAll(options)
      .then((result) => {
        const pagination = {
          currentPage: options.page,
          pages: Math.ceil((result.count / options.limit)),
          total: result.count,
        }
        return [
          result.rows,
          pagination,
        ]
      })
  }

  remove(condition, options = {}) {
    options.where = condition

    return this.ready
      .then(() => this.schema.destroy(options))
  }
}

module.exports = SequelizeRepository
