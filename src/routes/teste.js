const express = require('express')
const { test } = require('../Controllers/TesteController')

const router = express.Router()

router.get('/',
  test
)

module.exports = router
