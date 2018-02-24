const Layer = require('express/lib/router/layer')
const { wrapAction } = require('../Helpers/express')

const estabilishmentRouter = require('./estabilishment')
const authRouter = require('./auth')
const planRouter = require('./plan')
const testeRouter = require('./teste')
const categoryRouter = require('./category')
const cookeryRouter = require('./cookery')

// https://stackoverflow.com/questions/44327291/express-js-wrap-every-middleware-route-in-decorator
const handleRequest = Layer.prototype.handle_request
Layer.prototype.handle_request = function routesWrapper(...args) {
  if (this.method && !this.isWrapped) {
    const action = this.handle
    this.handle = wrapAction(action)

    this.isWrapped = true
  }
  return handleRequest.apply(this, args)
}

module.exports = (app) => {
  app.use('/estabilishment', estabilishmentRouter)
  app.use('/auth', authRouter)
  app.use('/teste', testeRouter)
  app.use('/plans', planRouter)
  app.use('/categories', categoryRouter)
  app.use('/cookeries', cookeryRouter)
}
