const testServer = require('../testServer')

const { database } = require('../../src/Helpers/database')
const { DATABASE } = require('../../config/constants')
const { adminToken } = require('../helpers')

describe('Establishment routes', () => {
  beforeAll(() => {
    return database.master.establishment.truncate({ force: true, searchPath: DATABASE.MASTER })
  })

  test('It should create a establishment', () => {
    const payload = {
      name: 'Bar do Denis',
      active: true,
      logo: 'http://abc.s3.com/abc.jpg',
      slug: 'bar-do-denis',
      email: 'contato@bardodenis.com.br',
      site: 'bardodenis.com.br',
      landlinePhone: '4333433322',
      street: 'Rua',
      number: '25',
      district: 'Jardim',
      city: 'Londrina',
      state: 'PR',
      categoryId: 1,
    }

    return testServer
      .post('/establishments')
      .set('token', adminToken)
      .send(payload)
      .expect(201)
  })

  test('It should fail on create a establishment', () => {
    return testServer
      .post('/establishments')
      .set('token', adminToken)
      .send({ name: 'abc' })
      .expect(422)
  })
})
