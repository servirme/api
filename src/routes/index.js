const estabilishmentRouter = require('./estabilishment')
const testeRouter = require('./teste')

module.exports = (app) => {
  app.use('/estabilishment', estabilishmentRouter)
  app.use('/teste', testeRouter)

  app.get('/status', (req, res) => {
    res.status(200).send({ message: 'status.ok' })
  })
}
