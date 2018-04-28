const { Router } = require('express')

const router = Router()

router.get('/status', () => ({
  statusCode: 200,
  body: {
    timestamp: new Date().toISOString(),
    message: 'status.ok',
  },
}))

router.get('/robots.txt', () => ({
  statusCode: 200,
  body: 'robots.txt',
  headers: {
    'Content-Type': 'text/plain',
  },
}))

module.exports = router
