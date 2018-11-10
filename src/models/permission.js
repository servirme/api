const {
  __,
  filter,
  find,
  keys,
  negate,
  pipe,
  propEq,
} = require('ramda')
const { applyAcl, permissions } = require('../helpers/acl')

const allPermissions = keys(permissions)

const getInvalidRules = filter(pipe(find(propEq(__), allPermissions), negate))

const checkIfAllValid = (rules) => {
  const invalidRules = getInvalidRules(rules)

  console.log(invalidRules)
  if (invalidRules) {
    throw new Error('invalid rules found')
  }
}

const addPermissions = (permissionGroupId, rules) => {

}

const removePermissions = (permissionGroupId, rules) => {

}

module.exports.hasPermission = (permissionGroupId, ruleId) => {
  // TODO - check if group has access to rule
  return false
}

module.exports.all = () => allPermissions

module.exports.add = applyAcl(addPermissions, permissions.PERMISSION_ADD)

module.exports.remove = applyAcl(removePermissions, permissions.PERMISSION_REMOVE)
