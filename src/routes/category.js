const { Router } = require('express')
const { index, show } = require('../controllers/category')

const router = Router()

router.get('/categories', index)
router.get('/category/:id', show)

module.exports = router
