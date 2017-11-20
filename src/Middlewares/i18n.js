const { lensPath, view, set } = require('ramda')
const I18n = require('../Services/I18n')

const i18n = I18n.getInstance()
let language = I18n.validLocales[0]

module.exports.pre = (req) => {
  const headerLanguage = req.headers['Accept-Language']
  if (I18n.validLocales.includes(headerLanguage)) {
    language = headerLanguage
  }
  return req
}

module.exports.post = ({ body = {}, translate = [], ...response }) => {
  translate.push('message')

  i18n.setLocale(language)

  response.body = translate.reduce((oldBody, keyToTranslate) => {
    const keyTranslatePath = keyToTranslate.split('.')
    const path = lensPath(keyTranslatePath)

    const value = view(path, oldBody)
    const translated = i18n.translate(value)

    return set(path, translated, oldBody)
  }, body)

  return response
}
