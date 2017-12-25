const { readdirSync } = require('fs')
const { join } = require('path')
const Sequelize = require('sequelize')
const log4js = require('log4js')
const {
  map,
  indexBy,
  prop,
  has,
  filter,
  pipe,
  forEach,
} = require('ramda')

const {
  NODE_ENV,
  OFFLINE,
  DATABASE_HOST,
  DATABASE_USERNAME,
  DATABASE_PASSWORD,
} = process.env
const logger = log4js.getLogger('database')

const offline = OFFLINE === 'true'
const logging = (NODE_ENV === 'production' || process.env.LOGGING === 'true') && logger.debug.bind(logger)
const host = offline ? 'local.db' : DATABASE_HOST

const ENTITIES_DIRECTORY = join(__dirname, '..', '..', 'Entities')

const entitiesFiles = readdirSync(ENTITIES_DIRECTORY)
  .map(file => join(ENTITIES_DIRECTORY, file))
  .map(require)

const entitiesByName = indexBy(prop('name'), entitiesFiles)

const runSingleAssociate = (entities, entity) => {
  const mountedEntity = entities[entity.name]

  entity.associate(mountedEntity, entities)
}

const runAssociate = pipe(
  filter(has('associate')),
  forEach(entity => runSingleAssociate(entitiesFiles, entity))
)
const getSequelizeConfig = database => ({
  database,
  host,
  dialect: offline ? 'sqlite' : 'mysql',
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
})

const mountEntity = (sequelizeInstance, { name, fields, config = {} }) => {
  const schema = sequelizeInstance.define(
    name,
    fields,
    config
  )

  if (offline) {
    schema.sync()
  }

  return schema
}

module.exports = (database) => {
  const sequelizeConfig = getSequelizeConfig(database)
  const sequelize = new Sequelize(sequelizeConfig)

  const mountedEntities = map(
    entity => mountEntity(sequelize, entity),
    entitiesByName
  )
  runAssociate(mountedEntities)

  return mountedEntities
}

