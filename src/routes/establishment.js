const { Router } = require('express')

const {
  show,
  create,
  update,
  select,
} = require('../controllers/establishment')
const {
  adminAuth,
  validate,
} = require('../middlewares')
const {
  create: createSchema,
  update: updateSchema,
  show: showSchema,
  select: selectSchema,
} = require('../validators/establishment')
const { wrapAction } = require('../helpers/express')

const router = Router()

router.post(
  '/establishments',
  adminAuth,
  validate(createSchema),
  wrapAction(create)
)
router.put(
  '/establishment/:id',
  adminAuth,
  validate(updateSchema),
  wrapAction(update)
)
router.get(
  '/establishment/:id',
  adminAuth,
  validate(showSchema),
  wrapAction(show)
)

router.get(
  '/establishment/:establishmentId/select',
  adminAuth,
  validate(selectSchema),
  wrapAction(select)
)

module.exports = router
