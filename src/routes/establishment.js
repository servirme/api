const { Router } = require('express')

const EstablishmentController = require('../Controllers/Establishment')
const {
  adminAuth,
  validate,
} = require('../middlewares')
const {
  create: createSchema,
  update: updateSchema,
  show: showSchema,
} = require('../validators/establishment')
const { wrapAction } = require('../helpers/express')

const router = Router()
const controller = new EstablishmentController()

const {
  show,
  create,
  update,
  // userEstabilishments,
} = controller

router.post(
  '/establishments',
  adminAuth,
  validate(createSchema),
  wrapAction(create)
)
// router.get(
//   '/establishments/my',
//   adminAuth,
//   wrapAction(userEstabilishments)
// )
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

module.exports = router
