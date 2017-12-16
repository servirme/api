const estabilishmentRouter = require('./estabilishment')

module.exports = (app) => {
  app.use('/estabilishment', estabilishmentRouter)
}
