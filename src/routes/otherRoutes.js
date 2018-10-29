const { Router } = require('express')
const { wrapAction } = require('../helpers/express')

const router = Router()

const status = () => {
  const now = new Date()
  return {
    statusCode: 200,
    body: {
      datetime: now.toISOString(),
      message: 'status.ok',
    },
  }
}

const robots = () => ({
  statusCode: 200,
  body: 'robots.txt',
  headers: {
    'Content-Type': 'text/plain',
  },
})

router.get('/status', wrapAction(status))
router.get('/robots.txt', wrapAction(robots))

module.exports = router
