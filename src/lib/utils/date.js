/**
 * @return {Date}
 */
const createDate = ({ days = 0, hours = 0, minutes = 0, seconds = 0 } = {}) => {
  const date = new Date()

  date.setDate(date.getDate() + days)
  date.setHours(date.getHours() + hours)
  date.setMinutes(date.getMinutes() + minutes)
  date.setSeconds(date.getSeconds() + seconds)

  return date
}
module.exports.date = createDate

module.exports.dateISO = (offset) => {
  return createDate(offset).toISOString()
}

const dateTimestamp = (offset) => {
  return createDate(offset).getTime()
}

module.exports.dateTimestamp = dateTimestamp

module.exports.dynamoTTL = (offset) => {
  return Math.round(dateTimestamp(offset) / 1000)
}
