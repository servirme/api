const { Router } = require('express')

const establishmentRouter = require('./establishment')
const authRouter = require('./auth')
const planRouter = require('./plan')
const categoryRouter = require('./category')
const cookeryRouter = require('./cookery')
const itemRouter = require('./item')

const { apiLogger } = require('../middlewares/index')

const router = Router()

router.use(apiLogger)

router.use(establishmentRouter)
router.use(authRouter)
router.use(planRouter)
router.use(categoryRouter)
router.use(cookeryRouter)
router.use(itemRouter)

module.exports = router
