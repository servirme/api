const { Router } = require('express')
const PlanController = require('../Controllers/Plan')
const { wrapAction } = require('../helpers/express')

const router = Router()
const controller = new PlanController()

const { index, show } = controller

router.get(
  '/plans/',
  wrapAction(index)
)
router.get(
  '/plan/:id',
  wrapAction(show)
)

module.exports = router
