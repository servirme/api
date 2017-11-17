const BbPromise = require('bluebird')
const { path } = require('ramda')

class Transform {
  constructor() {
    this._transformSets = {}
  }

  addTransformSet(alias, transformMap) {
    this._transformSets[alias] = transformMap
  }

  _transformField(record, transformSet, field, options) {
    const transformMap = typeof transformSet === 'string' ? this._transformSets[transformSet] : transformSet
    const transformation = transformMap[field]
    const typeOfTransformation = typeof transformation

    if (typeOfTransformation === 'string') {
      return path(transformation, record)
    } else if (Array.isArray(transformation)) {
      return transformation.map((fieldTransform) => {
        return path(fieldTransform, record)
      })
    } else if (typeOfTransformation === 'function') {
      return transformation(record)
    }

    const fieldValue = !Array.isArray(transformation.field) ?
      path(transformation.field, record) :
      transformation.field.map((fieldTransform) => {
        return path(fieldTransform, record)
      })

    const value = transformation.transformFunction ?
      transformation.transformFunction(fieldValue, record) : fieldValue
    if (!options.noDefaultValues) {
      return typeof value !== 'undefined' ? value : transformation.default
    }
    return value
  }

  transform(record, transformSet, options = {}) {
    const transformMap = typeof transformSet === 'string' ? this._transformSets[transformSet] : transformSet

    const values = Object.keys(transformMap)
      .map((field) => {
        const valueTransformed = this._transformField(record, transformSet, field, options)

        if (options.promise) {
          return BbPromise.resolve(valueTransformed)
            .then((value) => {
              return typeof value !== 'undefined' ? {
                [field]: value,
              } : {}
            })
        }

        return typeof valueTransformed !== 'undefined' ? {
          [field]: valueTransformed,
        } : {}
      })

    if (options.promise) {
      const groupValues = (finalValue, value) => {
        Object.assign(finalValue, value)
        return finalValue
      }

      return BbPromise.reduce(values, groupValues, {})
    }
    return Object.assign({}, ...values)
  }

  transformMulti(records, transformSet, options) {
    const results = records.map((record) => {
      return this.transform(record, transformSet, options)
    })

    return options.promise ? BbPromise.all(results) : results
  }
}

module.exports = Transform
