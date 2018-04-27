const express = require('express')
const {
  show,
  create,
  update,
  // userEstabilishments,
} = require('../controllers/establishment')
const {
  adminAuth,
} = require('../middlewares')

const router = express.Router()

router.post('/establishments', adminAuth, create)
// router.get('/establishments/my', adminAuth, userEstabilishments)
router.put('/establishment/:id', adminAuth, update)
router.get('/establishment/:id', adminAuth, show)

module.exports = router
