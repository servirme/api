const tokenModel = require('../models/token')

module.exports.refresh = async ({ auth }) => {
  const token = await tokenModel.sign(auth)

  return {
    statusCode: 200,
    body: {
      message: 'token.refresh',
      token,
    },
  }
}

module.exports.check = () => ({
  statusCode: 200,
  body: {
    message: 'token.ok',
  },
})

module.exports.invalidate = async ({ params }) => {
  await tokenModel.invalidate(params.tokenId)

  return {
    statusCode: 200,
    body: {
      message: 'token.invalidated',
    },
  }
}
