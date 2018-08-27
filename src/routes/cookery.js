const { Router } = require('express')
const { index, show } = require('../controllers/cookery')
const { wrapAction } = require('../helpers/express')

const router = Router()

router.get('/cookeries', wrapAction(index))
router.get('/cookery/:id', wrapAction(show))

module.exports = router
