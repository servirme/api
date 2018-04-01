const express = require('express')
const { show, create, update, index, destroy } = require('../controllers/item')
const { adminAuth } = require('../middlewares')

const router = express.Router()

router.get('/items/', adminAuth, index)
router.post('/items/', adminAuth, create)
router.put('/item/:id', adminAuth, update)
router.get('/item/:id', adminAuth, show)
router.delete('/item/:id', adminAuth, destroy)

module.exports = router
