const { readdirSync } = require('fs')
const { join } = require('path')
const Sequelize = require('sequelize')
const log4js = require('log4js')
const {
  assoc,
  filter,
  has,
} = require('ramda')

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
  dialectOptions: {
    prependSearchPath: true,
  },
}

const sequelize = new Sequelize(sequelizeConfig)

const ENTITIES_DIRECTORY = join(__dirname, '..', 'entities')

const entitiesFiles = readdirSync(ENTITIES_DIRECTORY)
  .map(file => join(ENTITIES_DIRECTORY, file))
  .map(entityName => sequelize.import(entityName))

const assocEntities = (entities, entity) => assoc(
  entity.name,
  entity,
  entities
)
const models = entitiesFiles.reduce(assocEntities, {})

const runSingleAssociate = entity => entity.associate(models)

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
