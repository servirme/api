const { Router } = require('express')
const { index, show } = require('../controllers/category')
const { wrapAction } = require('../helpers/express')

const router = Router()

router.get('/categories', wrapAction(index))
router.get('/category/:id', wrapAction(show))

module.exports = router
