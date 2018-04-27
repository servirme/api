const express = require('express')
const { index, show } = require('../controllers/plans')

const router = express.Router()

router.get('/plans/', index)
router.get('/plan/:id', show)

module.exports = router
