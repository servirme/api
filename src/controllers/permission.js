const permissionModel = require('../models/permission')

module.exports.all = () => {
  const permissions = permissionModel.all()

  return {
    statusCode: 200,
    body: {
      message: 'permission.all',
      result: permissions,
    },
  }
}

module.exports.add = async (req) => {
  const { groupId, rules } = req.body
  await permissionModel.add(req, groupId, rules)

  return {
    statusCode: 200,
    body: {
      message: 'permission.added',
    },
  }
}

module.exports.remove = async (req) => {
  const { groupId, rules } = req.body
  await permissionModel.remove(req, groupId, rules)

  return {
    statusCode: 200,
    body: {
      message: 'permission.added',
    },
  }
}
