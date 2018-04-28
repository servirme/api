const { Router } = require('express')
const { index, show } = require('../controllers/plans')

const router = Router()

router.get('/plans/', index)
router.get('/plan/:id', show)

module.exports = router
