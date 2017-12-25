const express = require('express')
const TesteController = require('../Controllers/TesteController')
const { wrapControllerAction } = require('../Helpers/express')

const router = express.Router()
const controller = new TesteController()
const {
  test,
} = controller

router.get('/',
  wrapControllerAction(controller, test)
)

module.exports = router
