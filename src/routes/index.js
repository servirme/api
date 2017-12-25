const estabilishmentRouter = require('./estabilishment')
const testeRouter = require('./teste')

module.exports = (app) => {
  app.use('/estabilishment', estabilishmentRouter)
  app.use('/teste', testeRouter)
}
