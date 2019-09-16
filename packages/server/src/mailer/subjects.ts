export interface Subjects {
  confirmEmail: string
  resetPassword: string
}

interface LocalizedSubjects {
  [lang: string]: Subjects
}

export const subjects: LocalizedSubjects = {
  en: {
    confirmEmail: 'Confirm your email',
    resetPassword: 'Reset your password'
  },
  sq: {
    confirmEmail: 'Konfirmoni email adresën',
    resetPassword: 'Rivendosni fjalëkalimin'
  }
}
