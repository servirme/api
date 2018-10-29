const { Router } = require('express')

const {
  login,
  register,
} = require('../controllers/auth')
const { wrapAction } = require('../helpers/express')
const { validate } = require('../middlewares')
const {
  login: loginSchema,
  register: registerSchema,
} = require('../validators/auth')

const router = Router()

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

module.exports = router
