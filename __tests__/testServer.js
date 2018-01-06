const request = require('supertest')
const app = require('../src/app')

module.exports = request(app)
