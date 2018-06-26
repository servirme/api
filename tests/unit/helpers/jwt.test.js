const jwt = require('../../../src/helpers/jwt')
const ExpiredError = require('../../../src/Errors/Expired')
const InvalidError = require('../../../src/Errors/Invalid')

const payload = {
  name: 'matheus',
  age: 23,
  sex: 'M',
  alive: true,
  drinks_coffee: false,
  family: [
    {
      name: 'little me',
      age: 10,
    },
  ],
  job: {
    title: 'developer',
    at: 'servir.me',
  },
}

describe('JWT', () => {
  describe('with payload signed', () => {
    let jwtToken

    beforeAll(() => {
      jwtToken = jwt.sign(payload)
    })

    test('token should be a string', () => {
      expect(typeof jwtToken).toBe('string')
    })

    test('verify should return same payload', () => {
      const payloadInsideToken = jwt.verify(jwtToken)
      expect(payloadInsideToken).toMatchObject(payload)
    })

    test('decode should return the same payload', () => {
      const payloadInsideToken = jwt.getData(jwtToken)
      expect(payloadInsideToken).toMatchObject(payload)
    })
  })

  test('invalid issuer', () => {
    const differentIssuerToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoibWF0aGV1cyIsImFnZSI6MjMsInNleCI6Ik0iLCJhbGl2ZSI6dHJ1ZSwiZHJpbmtzX2NvZmZlZSI6ZmFsc2UsImZhbWlseSI6W3sibmFtZSI6ImxpdHRsZSBtZSIsImFnZSI6MTB9XSwiam9iIjp7InRpdGxlIjoiZGV2ZWxvcGVyIiwiYXQiOiJzZXJ2aXIubWUifSwiaWF0IjoxNTE0ODYyNTU4LCJleHAiOjE4MzA0Mzg1NTgsImlzcyI6Imdvb2dsZS5jb20ifQ.tPfa6sB4f7WAZ1xBtr3VRgQxbHCU6mw-GJIEtoOoZh4'

    expect(() => {
      jwt.verify(differentIssuerToken)
    }).toThrow(InvalidError)
  })

  test('expired token', () => {
    const oldToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoibWF0aGV1cyIsImFnZSI6MjMsInNleCI6Im0iLCJhbGl2ZSI6dHJ1ZSwiZHJpbmtzX2NvZmZlZSI6ZmFsc2UsImZhbWlseSI6W3sibmFtZSI6ImxpdHRsZSBtZSIsImFnZSI6MTB9XSwiam9iIjp7InRpdGxlIjoiZGV2ZWxvcGVyIiwiYXQiOiJzZXJ2aXIubWUifSwiaWF0IjoxNTE0MjUyMzYzLCJleHAiOjE1MTQyNTIzNjQsImlzcyI6InNlcnZpci5tZSJ9.R8aIRfV_vq0PCo5mGM3NSvGgPHahHBHF6JxPWNcrHFc'

    expect(() => {
      jwt.verify(oldToken)
    }).toThrow(ExpiredError)
  })
})
