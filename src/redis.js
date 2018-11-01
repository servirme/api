const redis = require('redis')
const Promise = require('bluebird')

const {
  REDIS_HOST,
} = process.env

const redisConfig = {
  host: REDIS_HOST,
}

const client = Promise.promisifyAll(redis.createClient(redisConfig))

client.on('error', (err) => {
  console.log('Error', err)
})

// client.set('string key', 'string val', redis.print)

const key = 'string-keykjsadhkjahds'
const val = {
  name: 'value',
}

Promise.resolve()
  .then(() => client.hmsetAsync(key, val).then(console.log))
  .then(() => client.expireAsync(key, 10).then(console.log))
  // .then(() => client.ttlAsync(key).then(console.log))
  .then(() => client.hgetallAsync(key).then(console.log))

// module.exports = client

// module.exports.connect = logger =>
