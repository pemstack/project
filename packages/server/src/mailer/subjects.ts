export interface Subjects {
  confirmEmail: string
}

interface LocalizedSubjects {
  [lang: string]: Subjects
}

export const subjects: LocalizedSubjects = {
  en: {
    confirmEmail: 'Confirm your email'
  },
  sq: {
    confirmEmail: 'Konfirmoni email adresën'
  }
}
