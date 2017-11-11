const { join } = require('path')
const i18n = require('i18n')

const validLocales = [
  'en-US',
  'pt-BR',
]

let instance = false
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

class I18n {
  static getInstance() {
    if (!instance) {
      instance = new I18n()
      i18nConfig.register = instance
      i18n.configure(i18nConfig)
    }
    return instance
  }

  translate(...params) {
    const { key, data } = normalizeTranslateInput(...params)
    return this.__(key, data)
  }
}

I18n.validLocales = validLocales

module.exports = I18n
