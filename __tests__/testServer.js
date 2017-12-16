const request = require('supertest')
const server = require('../src/server')

afterAll(() => {
  server.close()
})

module.exports = request(server)
