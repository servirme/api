const express = require('express')
const { show, create, update } = require('../controllers/establishment')
const {
  adminAuth,
  masterAuth,
} = require('../middlewares')

const router = express.Router()

router.post('/', masterAuth, create)
router.put('/:id', adminAuth, update)
router.get('/:id', adminAuth, show)

module.exports = router
