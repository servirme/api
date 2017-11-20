const Transform = require('./Transform')

class UserTransform extends Transform {
  constructor() {
    super()

    this.addTransformSet('input', {
      name: 'name',
    })

    this.addTransformSet('output', {
      id: 'id',
      name: 'name',
    })
  }
}

module.exports = UserTransform
