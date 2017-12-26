const testeModel = require('../Models/TesteModel')

module.exports.test = () => {
  return testeModel.getTeste(2)
    .then(teste => ({
      statusCode: 201,
      body: {
        message: 'estabilishment.show',
        result: teste,
      },
    }))
}
