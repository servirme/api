const { Router } = require('express')

const {
  all,
  add,
  remove,
} = require('../controllers/permission')
const {
  adminAuth,
  validate,
} = require('../middlewares')
const {
  add: addSchema,
  remove: removeSchema,
} = require('../validators/permission')
const { wrapAction } = require('../helpers/express')

const router = Router()

router.get(
  '/permission/all',
  adminAuth,
  wrapAction(all)
)

router.post(
  '/permissions/add',
  adminAuth,
  validate(addSchema),
  wrapAction(add)
)

router.delete(
  '/permissions/remove',
  adminAuth,
  validate(removeSchema),
  wrapAction(remove)
)

module.exports = router
