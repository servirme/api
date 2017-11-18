class Model {
  transformInput(payload) {
    return this.transform.transform(payload, 'input')
  }

  transformOutput(payload) {
    return this.transform.transform(payload, 'output')
  }
}

module.exports = Model
