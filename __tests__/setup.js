const dotenv = require('dotenv')

// Run before any test
module.exports = () => {
  dotenv.config()
}
