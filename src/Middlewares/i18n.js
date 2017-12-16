const { lensPath, view, set } = require('ramda')
const I18n = require('../Services/I18n')

const i18n = I18n.getInstance()
const defaultLanguage = I18n.validLocales[0]

const translateBody = (translate, body, language) => {
  i18n.setLocale(language)

  if (typeof body === 'string') {
    return i18n.translate(body)
  }

  return translate.reduce((oldBody, keyToTranslate) => {
    const keyTranslatePath = keyToTranslate.split('.')
    const path = lensPath(keyTranslatePath)

    const value = view(path, oldBody)
    const translated = i18n.translate(value)

    return set(path, translated, oldBody)
  }, body)
}

module.exports = (req, res, next) => {
  const language = req.headers['Accept-Language'] || defaultLanguage

  if (I18n.validLocales.includes(language)) {
    req.language = language
  } else {
    req.language = defaultLanguage
  }

  const toTranslate = ['message']
  res.translate = (key) => {
    toTranslate.push(key)
    return res
  }

  const send = res.send
  res.send = (responseBody) => {
    const translatedBody = translateBody(toTranslate, responseBody, language)

    res.send = send
    return res.send(translatedBody)
  }

  next()
}
