const testeRepository = require('../Repositories/TesteRepository')

module.exports.getTeste = (estabilishmentId) => {
  return testeRepository.getOne(estabilishmentId)
}
