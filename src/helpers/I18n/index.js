const { join } = require('path')
const i18n = require('i18n')
const log4js = require('log4js')
const { assoc } = require('ramda')

const i18nConfig = require('../../../config/i18n')
const { isProd } = require('../../../config/env')

const logger = log4js.getLogger('api')

const i18nBaseConfig = {
  autoReload: !isProd,
  locales: i18nConfig.validLocales,
  objectNotation: true,
  syncFiles: true,
  indent: '  ',
  directory: join(__dirname, 'locales'),
  api: {
    __: 'i18nTranslate',
  },
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

module.exports.getInstance = (language) => {
  if (!instances[language]) {
    const instance = {
      translate(...params) {
        const { key, data } = normalizeTranslateInput(...params)
        const translated = this.i18nTranslate(key, data)

        if (translated === key) {
          logger.warn({
            message: 'Response not translated',
            language,
            key,
          })
        }

        return translated
      },
    }

    const i18nInstanceConfig = assoc('register', instance, i18nBaseConfig)
    i18n.configure(i18nInstanceConfig)
    instance.setLocale(language)

    instances[language] = instance
  }
  return instances[language]
}

module.exports.getLanguageOrDefault = (language) => {
  if (language && i18nConfig.locales.includes(language)) {
    return language
  }

  return i18nConfig.default
}
