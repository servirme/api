const { Router } = require('express')

const { login, register, refreshToken } = require('../controllers/auth')
const { anyAuth } = require('../middlewares')

const router = Router()

router.post('/login', login)
router.post('/register', register)
router.get('/refresh', anyAuth, refreshToken)

module.exports = router
