const permissionModel = require('../../models/permission')
const NotAuthorizedError = require('../../Errors/NotAuthorized')
const InternalError = require('../../Errors/Internal')
const { AUTH } = require('../../constants')
const permissions = require('./permissions')

const hasPermission = (aclGroupId, rule) => {
  if (!rule) {
    return true
  }
  return permissionModel.hasPermission(aclGroupId, rule.id)
}

module.exports.permissions = permissions

module.exports.applyAcl = (fn, rule = false) => (req, ...params) => {
  if (!req.auth) {
    throw new InternalError('Public route trying to access protected resource', req)
  }

  const aclGroupId = req.auth.establishment.acl_group_id
  const isMaster = req.auth.type === AUTH.LEVELS.MASTER

  if (!isMaster && !hasPermission(aclGroupId, rule)) {
    throw new NotAuthorizedError('insuficient-permission', rule)
  }

  return fn(...params)
}
