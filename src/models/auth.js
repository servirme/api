const InvalidError = require('../Errors/Invalid')
const { checkHashPassword } = require('../helpers/security')
const { removeJwtFields, generateToken, sign } = require('../helpers/jwt')
const { models } = require('./database')
const { hashPassword } = require('../helpers/security')
const { checkConflict, checkExists } = require('../helpers/model')

const checkPassword = async (plainTextPassword, user) => {
  const valid = await checkHashPassword(
    plainTextPassword,
    user.password
  )

  if (!valid) {
    throw new InvalidError('password')
  }
}

const createUser = async ({ email, password }) => {
  try {
    const hashedPassword = await hashPassword(password)

    return await models.User.create({
      email,
      password: hashedPassword,
    })
  } catch (error) {
    return checkConflict('user', error)
  }
}

module.exports.signUp = async (credentials) => {
  const createdUser = await createUser(credentials)

  return generateToken({ user: createdUser })
}

module.exports.signIn = async ({ email, password }) => {
  const user = await models.User.findOne({ where: { email } })

  checkExists('user', user)

  await checkPassword(password, user)

  return generateToken({ user })
}

module.exports.refresh = (currentAuthData) => {
  const decoded = removeJwtFields(currentAuthData)

  return sign(decoded)
}
