const { Router } = require('express')

const {
  login,
  register,
  refreshToken,
  check,
} = require('../controllers/auth')
const { anyAuth } = require('../middlewares')

const router = Router()

router.post('/auth/login', login)
router.post('/auth/register', register)
router.get('/auth/refresh', anyAuth, refreshToken)
router.get('/auth/check', anyAuth, check)

module.exports = router
