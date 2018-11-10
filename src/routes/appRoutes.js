const { Router } = require('express')

const establishmentRouter = require('./establishment')
const authRouter = require('./auth')
const planRouter = require('./plan')
const userRouter = require('./user')
const permissionRouter = require('./permission')

const { apiLogger } = require('../middlewares/index')

const router = Router()

router.use(apiLogger)

router.use(establishmentRouter)
router.use(authRouter)
router.use(planRouter)
router.use(userRouter)
router.use(permissionRouter)

module.exports = router
