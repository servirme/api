const Sequelize = require('sequelize')
const BaseRepository = require('./BaseRepository')
const ConflictException = require('../Exceptions/ConflictException')

const {
  NODE_ENV,
  OFFLINE,
  DATABASE_HOST,
  DATABASE_NAME,
  DATABASE_USERNAME,
  DATABASE_PASSWORD,
} = process.env

const offline = OFFLINE === 'true'
const logging = NODE_ENV !== 'production' && process.env.LOGGING === 'true' && console.log // eslint-disable-line no-console
const host = offline ? 'local.db' : DATABASE_HOST

const sequelize = new Sequelize(DATABASE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD, {
  host,
  dialect: offline ? 'sqlite' : 'mysql',
  logging,
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
