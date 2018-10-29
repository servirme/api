const userModel = require('./user')
const jwtTransform = require('../transforms/jwt')
const InvalidError = require('../Errors/Invalid')
const { checkHashPassword } = require('../helpers/security')
const { sign } = require('../helpers/jwt')
const { AUTH } = require('../constants')

const signJwtUser = user => sign({ type: AUTH.LEVELS.ADMIN, user })
const checkPassword = async (plainTextPassword, user) => {
  const valid = await checkHashPassword(
    plainTextPassword,
    user.password
  )

  if (!valid) {
    throw new InvalidError('password')
  }
}

module.exports.signUp = async (credentials) => {
  const createdUser = await userModel.createUser(credentials)
  const jwtData = jwtTransform({
    user: createdUser,
  })

  return signJwtUser(jwtData)
}

module.exports.signIn = async ({ email, password }) => {
  const user = await userModel.getByEmail(email)

  await checkPassword(password, user)

  const jwtData = jwtTransform({
    user,
  })

  return signJwtUser(jwtData)
}
