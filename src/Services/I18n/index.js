const { join } = require('path')
const i18n = require('i18n')

const validLocales = [
  'pt-BR',
  'en-US',
]

const i18nConfig = {
  locales: validLocales,
  objectNotation: true,
  syncFiles: true,
  indent: '    ',
  directory: join(__dirname, 'locales'),
}

const normalizeTranslateInput = (key, data = {}) => {
  if (typeof key === 'object') {
    return normalizeTranslateInput(key.key, key.data)
  }
  return {
    key,
    data,
  }
}
let instance = false

class I18n {
  static getInstance() {
    if (!instance) {
      instance = new I18n()
      i18nConfig.register = instance.i18nInstance
      i18n.configure(i18nConfig)
    }
    return instance
  }

  constructor() {
    this.i18nInstance = {}
  }

  translate(...params) {
    const { key, data } = normalizeTranslateInput(...params)
    return this.i18nInstance.__(key, data)
  }

  setLocale(language) {
    return this.i18nInstance.setLocale(language)
  }
}

I18n.validLocales = validLocales

module.exports = I18n
