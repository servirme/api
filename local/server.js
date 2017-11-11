/* eslint-disable no-console, global-require */

require('dotenv').config()
const { readFileSync } = require('fs')
const { join } = require('path')
const cors = require('cors')
const express = require('express')
const { safeLoad } = require('js-yaml')

const serverlessPath = join(__dirname, '..', 'serverless.yml')
const serverlessFile = safeLoad(readFileSync(serverlessPath))

const PORT = process.env.PORT || 3000
const app = express()

const files = {}
const lambdaWrapper = (lambdaHandler) => {
  return (req, res) => {
    const event = {
      headers: req.headers,
      body: JSON.stringify(req.body),
      pathParameters: req.params,
      queryStringParameters: req.query,
      authorizer: req.authorizer,
      methodArn: 'arn:aws:execute-api:us-west-2:344254304759:8b591hliw4/*/GET/logs',
    }
    const context = {}
    const callback = (err, data) => {
      if (err) {
        console.log(err)
        res.status(500).send(err.message)
      } else {
        if (data.headers) {
          Object.keys(data.headers).forEach((header) => {
            res.set(header, data.headers[header])
          })
        }
        res.status(data.statusCode).send(data.body)
      }
    }

    lambdaHandler(event, context, callback)
  }
}

const registerRoutes = () => {
  Object.keys(serverlessFile.functions).forEach((lambdaFunction) => {
    const functionData = serverlessFile.functions[lambdaFunction]
    if (functionData.events) {
      functionData.events
        .filter((event) => {
          return event.http
        })
        .forEach((event) => {
          const httpEvent = event.http
          const method = httpEvent.method.toLowerCase()
          const apiPath = httpEvent.path.replace(/\{(.*?)\}/g, ':$1')
          const [, file, handler] = functionData.handler.match(/(.*)\.(.*)/)
          if (!files[file]) {
            files[file] = require(`../${file}`)
          }
          console.log(method, apiPath, functionData.handler)

          const routesHandler = [lambdaWrapper(files[file][handler])]

          app[method](apiPath, ...routesHandler)
        })
    }
  })
}

console.log('\x1Bc')
app.use(cors())
registerRoutes()

app.listen(PORT, () => {
  console.log(`API running in localhost:${PORT}`)
})
