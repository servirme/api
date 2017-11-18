const Transform = require('./Transform')

class EstabilishmentTransform extends Transform {
  constructor() {
    super()

    this.addTransformSet('input', {
      name: 'name',
    })

    this.addTransformSet('output', {
      name: 'name',
    })
  }
}

module.exports = EstabilishmentTransform
