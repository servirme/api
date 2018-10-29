const { Router } = require('express')

const {
  check,
  refresh,
  invalidate,
} = require('../controllers/auth')
const { wrapAction } = require('../helpers/express')
const { anyAuth } = require('../middlewares')

const router = Router()

router.get(
  '/token/refresh',
  anyAuth,
  wrapAction(refresh)
)
router.get(
  '/token/check',
  anyAuth,
  wrapAction(check)
)
router.delete(
  '/token/:tokenId',
  anyAuth,
  wrapAction(invalidate)
)

module.exports = router
