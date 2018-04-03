const express = require('express')
const { show, create, update, index, destroy } = require('../controllers/section')
const { adminAuth } = require('../middlewares')

const router = express.Router()

router.get('/', adminAuth, index)
router.post('/', adminAuth, create)
router.put('/:id', adminAuth, update)
router.get('/:id', adminAuth, show)
router.delete('/:id', adminAuth, destroy)

module.exports = router
