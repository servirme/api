const express = require('express')
const { show } = require('../Controllers/EstabilishmentController')
const {
  adminAuth,
} = require('../Middlewares')

const router = express.Router()

router.get('/:id',
  adminAuth,
  show
)

module.exports = router
