const permissionModel = require('../../models/permission')
const NotAuthorizedError = require('../../Errors/NotAuthorized')
const { AUTH } = require('../../constants')
const permissions = require('./permissions')

const hasPermission = (permissionGroupId, rule) => {
  if (!rule) {
    return true
  }
  return permissionModel.hasPermission(permissionGroupId, rule.id)
}

module.exports.permissions = permissions

module.exports.applyAcl = (fn, rule = false) => (req, ...params) => {
  const permissionGroupId = req.auth.user.acl_group
  const isMaster = req.auth.type !== AUTH.LEVELS.MASTER

  if (!isMaster && !hasPermission(permissionGroupId, rule)) {
    throw new NotAuthorizedError('insuficient-permission', rule)
  }

  return fn(...params)
}
