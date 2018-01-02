const { DATABASE } = require('../../config/constants')

const clientSchemaRegex = new RegExp(`${DATABASE.CLIENT_PREFIX}(\\d+)`)

module.exports = (queryInterface, migrationFunction) => {
  return queryInterface.showAllSchemas()
    .then((schemas) => {
      return schemas
        .reduce((clientsSchemas, schema) => {
          if (schema === DATABASE.BASE_CLIENT
            || schema.match(clientSchemaRegex)) {
            clientsSchemas.push(schema)
          }

          return clientsSchemas
        }, [])
    })
    .then((schemas) => {
      const promises = schemas
        .map(schema => migrationFunction(schema))

      return Promise.all(promises)
    })
}
