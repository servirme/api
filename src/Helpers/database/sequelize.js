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
  DATABASE_HOST,
  DATABASE_USERNAME,
  DATABASE_PASSWORD,
} = process.env
const logger = log4js.getLogger('database')

const logging = (NODE_ENV === 'production' || process.env.LOGGING === 'true') && logger.debug.bind(logger)

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
  host: DATABASE_HOST,
  dialect: 'postgres',
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
  return sequelizeInstance.define(
    name,
    fields,
    config
  )
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
