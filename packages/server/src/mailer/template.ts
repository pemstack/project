import { inSrc } from 'globals'

export function template(name: string, lang = 'en') {
  return inSrc(`mailer/templates/${lang}/${name}.hbs`)
}
