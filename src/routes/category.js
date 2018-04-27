const express = require('express')
const { index, show } = require('../controllers/category')

const router = express.Router()

router.get('/categories', index)
router.get('/category/:id', show)

module.exports = router
