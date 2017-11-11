const Sequelize = require('sequelize')
const BaseRepository = require('./BaseRepository')
const ConflictException = require('../Exceptions/ConflictException')

const host = process.env.DATABASE_HOST
const database = process.env.DATABASE_NAME
const username = process.env.DATABASE_USERNAME
const password = process.env.DATABASE_PASSWORD

const sequelize = new Sequelize(database, username, password, {
  host,
  dialect: 'mysql',
  logging: process.env.NODE_ENV !== 'prod',
})

class SequelizeRepository extends BaseRepository {
  constructor({ name, fields, config = {} }) {
    super()
    this.schema = sequelize.define(
      name,
      fields,
      config
    )

    this.ready = this.schema.sync()
  }

  create(payload) {
    return this.ready
      .then(() => this.schema.create(payload))
      .catch((err) => {
        if (err.name === 'SequelizeUniqueConstraintError') {
          throw new ConflictException(this._alias)
        }
        return Promise.reject(err)
      })
  }

  update(identifier, payload) {
    return this.ready
      .then(() => this.schema.create(payload))
  }

  getOne(condition) {
    const options = {
      where: condition,
    }

    return this.ready
      .then(() => this.schema.findOne(options))
  }

  getAll(condition, page = 1, pageLimit = this.pageLimit) {
    const options = {
      where: condition,
      limit: pageLimit,
      offset: (page - 1) * pageLimit,
    }

    return this.ready
      .then(() => this.schema.findAndCountAll(options))
      .then((result) => {
        const pagination = {
          currentPage: page,
          pages: Math.ceil((result.count / pageLimit)),
          total: result.count,
        }
        return [
          result.rows,
          pagination,
        ]
      })
  }

  remove(condition) {
    const options = {
      where: condition,
    }
    return this.ready
      .then(() => this.schema.destroy(options))
  }
}

module.exports = SequelizeRepository
