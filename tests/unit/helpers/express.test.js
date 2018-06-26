const { stub, assert } = require('sinon')

const {
  wrapAction,
} = require('../../../src/helpers/express')

describe('Express helper', () => {
  describe('wrapAction', () => {
    describe('normal flow', () => {
      const fakeResponse = {
        statusCode: 2018,
        body: { fake: 'body' },
        headers: { fake: 'header' },
        translate: ['fake translate'],
      }
      const action = stub().resolves(fakeResponse)

      const req = { fake: 'req' }

      const res = {}
      res.status = stub().returns(res)
      res.send = stub().returns(res)
      res.set = stub().returns(res)
      res.translate = stub().returns(res)

      const next = stub()

      beforeAll(() => {
        const handler = wrapAction(action)
        handler(req, res, next)
      })

      test('should call correct methods with correct arguments', () => {
        assert.calledOnce(action)
        assert.calledWithExactly(action, req)

        assert.callCount(res.translate, fakeResponse.translate.length)

        assert.calledOnce(res.set)
        assert.calledWithExactly(res.set, 'fake', fakeResponse.headers.fake)

        assert.calledOnce(res.status)
        assert.calledWithExactly(res.status, fakeResponse.statusCode)

        assert.calledOnce(res.send)
        assert.calledWithExactly(res.send, fakeResponse.body)

        assert.notCalled(next)
      })
    })

    describe('flow with error thrown', () => {
      const error = new Error('fake error')
      const action = stub().rejects(error)

      const req = { fake: 'req' }

      const res = {}
      res.status = stub()
      res.send = stub()
      res.set = stub()
      res.translate = stub()

      const next = stub()

      beforeAll(() => {
        const handler = wrapAction(action)
        handler(req, res, next)
      })

      test('should call correct methods with correct arguments', () => {
        assert.calledOnce(action)
        assert.calledWithExactly(action, req)

        assert.calledOnce(next)
        assert.calledWithExactly(next, error)
      })
    })
  })
})
