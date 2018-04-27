const { readdirSync } = require('fs')
const { join } = require('path')
const Sequelize = require('sequelize')
const log4js = require('log4js')
const {
  map,
  has,
  filter,
} = require('ramda')
const { DATABASE } = require('../../config/constants')

const {
  NODE_ENV,
  DATABASE_HOST,
  DATABASE_USERNAME,
  DATABASE_PASSWORD,
  DATABASE_DATABASE,
  DATABASE_DIALECT,
  LOGGING,
} = process.env
const logger = log4js.getLogger('database')

const logging = (NODE_ENV === 'production' || LOGGING === 'true') && logger.debug.bind(logger)

const ENTITIES_DIRECTORY = join(__dirname, '..', 'entities')

const entitiesFiles = readdirSync(ENTITIES_DIRECTORY)
  .map(file => join(ENTITIES_DIRECTORY, file))
  .map(require)

const entitiesIndexed = entitiesFiles.reduce((entities, entity) => {
  if (!entities[entity.type]) {
    entities[entity.type] = {}
  }

  entities[entity.type][entity.name] = entity

  return entities
}, {})

const sequelizeConfig = {
  database: DATABASE_DATABASE,
  host: DATABASE_HOST,
  dialect: DATABASE_DIALECT,
  logging,
  operatorsAliases: Sequelize.Op,
  username: DATABASE_USERNAME,
  password: DATABASE_PASSWORD,
  benchmark: true,
  pool: {
    handleDisconnects: true,
    idle: 60000,
    acquire: 20000,
  },
  searchPath: 'servirme',
  dialectOptions: {
    prependSearchPath: true,
  },
}

const mountEntity = (sequelizeInstance, { name, fields, config = {} }) => {
  return sequelizeInstance.define(
    name,
    fields,
    config
  )
}

const sequelize = new Sequelize(sequelizeConfig)

const database = map(
  map(entity => mountEntity(sequelize, entity)),
  entitiesIndexed
)
database.sequelize = sequelize

const runSingleAssociate = (entity) => {
  const mountedEntity = database[entity.type][entity.name]

  entity.associate(mountedEntity, database)
}

const runAssociate = () => {
  const haveAssociations = filter(has('associate'), entitiesFiles)
  Object.values(haveAssociations).forEach(runSingleAssociate)
}

runAssociate(entitiesFiles)

if (DATABASE_DIALECT === 'sqlite') {
  sequelize.sync()
}

module.exports.database = database
module.exports.getClientDatabase = establishmentId =>
  DATABASE.CLIENT_PREFIX + establishmentId
