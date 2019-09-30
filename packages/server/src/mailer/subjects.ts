export interface Subjects {
  confirmEmail: string
  resetPassword: string
  invitationPending: string
}

interface LocalizedSubjects {
  [lang: string]: Subjects
}

export const subjects: LocalizedSubjects = {
  en: {
    confirmEmail: 'Confirm your email',
    resetPassword: 'Reset your password',
    invitationPending: 'You have a new invitation'
  },
  sq: {
    confirmEmail: 'Konfirmoni email adresën',
    resetPassword: 'Rivendosni fjalëkalimin',
    invitationPending: 'You have a new invitation'
  }
}
