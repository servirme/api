const express = require('express')
const { signIn, signUp } = require('../Controllers/AuthController')

const router = express.Router()

router.post('/sign-in',
  signIn
)

router.post('/sign-up',
  signUp
)

module.exports = router
