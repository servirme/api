const { Router } = require('express')

const AuthController = require('../Controllers/Auth')
const { wrapAction } = require('../helpers/express')
const { anyAuth, validate } = require('../middlewares')
const {
  login: loginSchema,
  register: registerSchema,
} = require('../validators/auth')

const router = Router()
const controller = new AuthController()

const { check } = AuthController
const {
  login,
  register,
  refreshToken,
} = controller

router.post(
  '/auth/login',
  validate(loginSchema),
  wrapAction(login)
)
router.post(
  '/auth/register',
  validate(registerSchema),
  wrapAction(register)
)
router.get(
  '/auth/refresh',
  anyAuth,
  wrapAction(refreshToken)
)
router.get(
  '/auth/check',
  anyAuth,
  wrapAction(check)
)

module.exports = router
