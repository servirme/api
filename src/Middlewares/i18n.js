const { lensPath, view, set } = require('ramda')
const I18n = require('../Helpers/I18n')

const translateBody = (translate, body, language) => {
  const i18n = I18n.getInstance(language)

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

const getRequestLanguage = (req) => {
  const language = req.headers['accept-language']

  if (language && I18n.validLocales.includes(language)) {
    return language
  }
  return I18n.validLocales[0]
}

module.exports = (req, res, next) => {
  const toTranslate = ['message']
  res.translate = (key) => {
    toTranslate.push(key)
    return res
  }

  const send = res.send
  res.send = (responseBody) => {
    const language = getRequestLanguage(req)
    const translatedBody = translateBody(toTranslate, responseBody, language)

    res.set('Content-Language', language)
    res.send = send
    return res.send(translatedBody)
  }

  next()
}
