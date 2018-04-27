const Layer = require('express/lib/router/layer')
const { wrapAction } = require('../helpers/express')

const establishmentRouter = require('./establishment')
const authRouter = require('./auth')
const planRouter = require('./plan')
const categoryRouter = require('./category')
const cookeryRouter = require('./cookery')

// https://stackoverflow.com/questions/44327291/express-js-wrap-every-middleware-route-in-decorator
const handleRequest = Layer.prototype.handle_request
Layer.prototype.handle_request = function routesWrapper(...args) {
  if (this.method && !this.isWrapped && this.handle.length <= 1) {
    const action = this.handle
    this.handle = wrapAction(action)

    this.isWrapped = true
  }
  return handleRequest.apply(this, args)
}

module.exports = (app) => {
  app.use(establishmentRouter)
  app.use(authRouter)
  app.use(planRouter)
  app.use(categoryRouter)
  app.use(cookeryRouter)
}
