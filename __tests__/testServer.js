const request = require('supertest')
const { app, server } = require('../src/server')

afterAll(() => {
  server.close()
})

module.exports = request(app)
