const express = require('express')
const EstabilishmentController = require('../Controllers/EstabilishmentController')
const { wrapControllerAction } = require('../Helpers/express')
const {
  adminAuth,
} = require('../Middlewares')

const router = express.Router()
const controller = new EstabilishmentController()
const {
  show,
} = controller

router.get('/:id',
  adminAuth,
  wrapControllerAction(controller, show)
)

module.exports = router
