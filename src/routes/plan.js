const { Router } = require('express')
const { index, show } = require('../controllers/plan')
const { wrapAction } = require('../helpers/express')

const router = Router()

router.get(
  '/plans/',
  wrapAction(index)
)
router.get(
  '/plan/:id',
  wrapAction(show)
)

module.exports = router
