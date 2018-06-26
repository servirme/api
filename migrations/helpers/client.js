const {
  equals,
  filter,
  match,
  or,
} = require('ramda')

const { DATABASE } = require('../../config/constants')

const clientSchemaRegex = new RegExp(`${DATABASE.CLIENT_PREFIX}\\d+`)

const isClientSchema = or(
  equals(DATABASE.BASE_CLIENT),
  match(clientSchemaRegex)
)

module.exports = (queryInterface, migrationFunction) => queryInterface
  .showAllSchemas()
  .then(filter(isClientSchema))
  .map(migrationFunction)
