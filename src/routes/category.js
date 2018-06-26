const { Router } = require('express')
const CategoryController = require('../Controllers/Category')
const { wrapAction } = require('../helpers/express')

const router = Router()
const controller = new CategoryController()

const { index, show } = controller

router.get('/categories', wrapAction(index))
router.get('/category/:id', wrapAction(show))

module.exports = router
