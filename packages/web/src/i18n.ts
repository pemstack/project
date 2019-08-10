import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import Backend from 'i18next-xhr-backend'
import moment from 'moment'
import { CookiesStore } from 'stores'
import 'moment/locale/sq'

moment.locale('en')

i18n.on('languageChanged', function (lng) {
  if (typeof document !== 'undefined') {
    document.cookie = `lang=${lng}; path=/`
  }

  moment.locale(lng)
})

i18n
  // load translation using xhr -> see /public/locales
  // learn more: https://github.com/i18next/i18next-xhr-backend
  .use(Backend)
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    fallbackLng: 'en',
    debug: process.env.NODE_ENV === 'development',
    interpolation: {
      escapeValue: false // not needed for react as it escapes by default
    }
  })

const cookies = new CookiesStore()
const currentLang = cookies.get('lang')
if (currentLang === 'sq' || currentLang === 'en') {
  i18n.changeLanguage(currentLang)
}

export default i18n
