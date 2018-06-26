const { assert, stub } = require('sinon')
const Joi = require('joi')

const validator = require('../../../src/middlewares/validator')

describe('middleware', () => {
  describe('validator', () => {
    describe('normal flow', () => {
      const req = {}
      const res = {}
      const next = stub()

      const schema = {
        validate: stub().returns({ error: false }),
      }

      beforeAll(() => {
        const validateFunction = validator(schema)
        validateFunction(req, res, next)
      })

      test('should call correct methods with correct arguments', () => {
        assert.calledOnce(schema.validate)
        assert.calledWithExactly(schema.validate, req, {
          abortEarly: false,
          stripUnknown: true,
        })

        assert.calledOnce(next)
        assert.calledWithExactly(next)
      })
    })

    describe('flow with error', () => {
      const req = {}
      const res = {}
      const next = stub()

      const validationError = Joi.object({
        name: Joi.string(),
      }).validate({ name: 123 }).error

      const schema = {
        validate: stub().returns({ error: validationError }),
      }

      const ValidationErrorFake = stub().returns('shdga')

      beforeAll(() => {
        const validateFunction = validator(schema, {
          ValidationError: ValidationErrorFake,
        })
        validateFunction(req, res, next)
      })

      test('should call correct methods with correct arguments', () => {
        assert.calledOnce(schema.validate)
        assert.calledWithExactly(schema.validate, req, {
          abortEarly: false,
          stripUnknown: true,
        })

        assert.calledOnce(ValidationErrorFake)
        assert.calledWithNew(ValidationErrorFake)
        assert.calledWithExactly(ValidationErrorFake, validationError)

        assert.calledOnce(next)
        assert.calledWithExactly(next, new ValidationErrorFake())
      })
    })
  })

  describe('getRuleRequired', () => {
    const rule = {
      required: stub().returns('required return'),
    }

    afterEach(() => {
      rule.required.resetHistory()
    })

    describe('when its required', () => {
      let returnValue

      beforeAll(() => {
        returnValue = validator.getRuleRequired(rule, true)
      })

      test('should return rule as required', () => {
        assert.calledOnce(rule.required)
        assert.calledWithExactly(rule.required)

        expect(returnValue).toBe('required return')
      })
    })

    describe('when its not required', () => {
      let returnValue

      beforeAll(() => {
        returnValue = validator.getRuleRequired(rule, false)
      })

      test('should return rule', () => {
        assert.notCalled(rule.required)

        expect(returnValue).toEqual(rule)
      })
    })
  })
})
