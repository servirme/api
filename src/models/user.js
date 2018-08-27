const userRepository = require('../repositories/user')
const { hashPassword } = require('../helpers/security')
const { checkConflict, checkExists } = require('../helpers/model')

module.exports.createUser = async ({ email, password }) => {
  try {
    const hashedPassword = await hashPassword(password)

    return userRepository.createUser({
      email,
      password: hashedPassword,
    })
  } catch (error) {
    return checkConflict('user', error)
  }
}

module.exports.getByEmail = async (email) => {
  const user = await userRepository.getByEmail(email)

  checkExists('user', user)

  return user
}
