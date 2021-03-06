export interface Subjects {
  confirmEmail: string
  resetPassword: string
  invitationPending: string,
  newPost(courseTitle: string): string
}

interface LocalizedSubjects {
  [lang: string]: Subjects
}

export const subjects: LocalizedSubjects = {
  en: {
    confirmEmail: 'Confirm your email',
    resetPassword: 'Reset your password',
    invitationPending: 'You have a new invitation',
    newPost: (courseTitle) => `New post in class ${courseTitle}`
  },
  sq: {
    confirmEmail: 'Konfirmoni email adresën',
    resetPassword: 'Rivendosni fjalëkalimin',
    invitationPending: 'Keni një ftesë të re',
    newPost: (courseTitle) => `Postim i ri në klasën ${courseTitle}`
  }
}
