const { Router } = require('express')

const { login, register, refreshToken } = require('../Controllers/AuthController')
const { anyAuth } = require('../Middlewares')

const router = Router()

router.post('/login', login)
router.post('/register', register)
router.get('/refresh', anyAuth, refreshToken)

module.exports = router
