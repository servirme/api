const BbPromise = require('bluebird')
const Exception = require('../../Exceptions/Exception')
const InternalException = require('../../Exceptions/InternalException')

const processLifeCycle = (previousValue, lifeCycle) => {
  return lifeCycle(previousValue)
}

const groupMiddlewares = (result, { pre, post }) => {
  if (pre) {
    result.pre.push(pre)
  }

  if (post) {
    result.post.unshift(post)
  }

  return result
}

const publisher = (Controller, actions) => {
  const controller = new Controller()
  const actionsNames = Object.keys(actions)

  return actionsNames.reduce((result, actionName) => {
    const { middlewares = [] } = actions[actionName]
    const { pre, post } = middlewares.reduce(groupMiddlewares, {
      pre: [],
      post: [],
    })

    result[actionName] = (...params) => {
      BbPromise.reduce(
        pre,
        processLifeCycle,
        params
      )
        .then(controller[actionName].bind(controller))
        .catch(Exception, (err) => {
          return {
            body: err.getBody(),
            statusCode: err.getHttpCode(),
            translate: err.getTranslateKeys(),
          }
        })
        .catch((err) => {
          const error = new InternalException(err)
          return {
            body: error.getBody(),
            statusCode: error.getHttpCode(),
            translate: error.getTranslateKeys(),
          }
        })
        .then((response) => {
          return BbPromise.reduce(
            post,
            processLifeCycle,
            response
          )
        })
    }
    return result
  }, {})
}

module.exports = publisher
