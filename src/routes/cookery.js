const { Router } = require('express')
const CookeryController = require('../Controllers/Cookery')
const { wrapAction } = require('../helpers/express')

const router = Router()
const controller = new CookeryController()

const { index, show } = controller

router.get('/cookeries', wrapAction(index))
router.get('/cookery/:id', wrapAction(show))

module.exports = router
