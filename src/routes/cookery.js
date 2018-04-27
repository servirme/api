const express = require('express')
const { index, show } = require('../controllers/cookery')

const router = express.Router()

router.get('/cookeries', index)
router.get('/cookery/:id', show)

module.exports = router
