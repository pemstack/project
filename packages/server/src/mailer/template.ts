import { inProject } from 'globals'

export function template(name: string, lang = 'en') {
  return inProject(`src/mailer/templates/${lang}/${name}.hbs`)
}
