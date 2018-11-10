let counter = 0
const generateRule = (ruleName) => {
  counter += 1

  return {
    id: counter,
    ruleName,
  }
}

module.exports.PERMISSION_ADD = generateRule('permission.add')
module.exports.PERMISSION_REMOVE = generateRule('permission.remove')

module.exports.ESTABLISHMENT_CREATE = generateRule('establishment.create')
module.exports.ESTABLISHMENT_UPDATE = generateRule('establishment.update')
