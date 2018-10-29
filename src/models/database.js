const { readdirSync } = require('fs')
const { join } = require('path')
const {
  assoc,
  filter,
  has,
} = require('ramda')

const sequelize = require('../database')

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

module.exports.models = models
