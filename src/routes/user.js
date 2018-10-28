const { Router } = require('express')

const {
  userEstabilishments,
} = require('../controllers/user')
const {
  adminAuth,
} = require('../middlewares')
const { wrapAction } = require('../helpers/express')

const router = Router()

router.get(
  '/user/establishments',
  adminAuth,
  wrapAction(userEstabilishments)
)

module.exports = router
