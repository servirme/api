const { readdirSync } = require('fs')
const { join } = require('path')
const Sequelize = require('sequelize')
const log4js = require('log4js')
const {
  assocPath,
  concat,
  filter,
  has,
  map,
} = require('ramda')
const { DATABASE } = require('../../config/constants')

const {
  DATABASE_DATABASE,
  DATABASE_DIALECT,
  DATABASE_HOST,
  DATABASE_PASSWORD,
  DATABASE_USERNAME,
  LOGGING,
  NODE_ENV,
} = process.env
const logger = log4js.getLogger('database')

const logging = (NODE_ENV === 'production' || LOGGING === 'true') && logger.debug.bind(logger)

const ENTITIES_DIRECTORY = join(__dirname, '..', 'entities')

const entitiesFiles = readdirSync(ENTITIES_DIRECTORY)
  .map(file => join(ENTITIES_DIRECTORY, file))
  .map(require)

const assocEntities = (entities, entity) => assocPath(
  [entity.type, entity.name],
  entity,
  entities
)
const entitiesIndexed = entitiesFiles.reduce(assocEntities, {})

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

const mountEntity = (
  sequelizeInstance,
  { name, fields, config = {} }
) => sequelizeInstance.define(
  name,
  fields,
  config
)

const sequelize = new Sequelize(sequelizeConfig)

const models = map(
  map(entity => mountEntity(sequelize, entity)),
  entitiesIndexed
)

const runSingleAssociate = (entity) => {
  const mountedEntity = models[entity.type][entity.name]

  entity.associate(mountedEntity, models)
}

const runAssociate = () => {
  const haveAssociations = filter(has('associate'), entitiesFiles)
  Object.values(haveAssociations).forEach(runSingleAssociate)
}

runAssociate(entitiesFiles)

if (DATABASE_DIALECT === 'sqlite') {
  sequelize.sync()
}

module.exports.models = models
module.exports.sequelize = sequelize
module.exports.getClientDatabase = concat(DATABASE.CLIENT_PREFIX)
