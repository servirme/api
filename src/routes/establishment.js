const express = require('express')
const { show, create, update } = require('../Controllers/EstablishmentController')
const {
  adminAuth,
} = require('../Middlewares')

const router = express.Router()

router.get('/:id',
  adminAuth,
  show
)

router.post('/',
  adminAuth,
  create
)

router.put('/:id',
  adminAuth,
  update
)

module.exports = router
