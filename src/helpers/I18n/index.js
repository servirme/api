const { join } = require('path')
const i18n = require('i18n')

const validLocales = [
  'pt-BR',
  'en-US',
]

const i18nBaseConfig = {
  locales: validLocales,
  objectNotation: true,
  syncFiles: true,
  indent: '  ',
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
const instances = {}

class I18n {
  static getInstance(language) {
    if (!instances[language]) {
      const instance = new I18n()

      const i18nConfig = Object.assign(i18nBaseConfig, {
        register: instance._i18n,
      })
      i18n.configure(i18nConfig)
      instance._i18n.setLocale(language)

      instances[language] = instance
    }
    return instances[language]
  }

  constructor() {
    this._i18n = {}
  }

  translate(...params) {
    const { key, data } = normalizeTranslateInput(...params)
    return this._i18n.__(key, data)
  }
}

I18n.validLocales = validLocales

module.exports = I18n
