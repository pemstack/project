import { GetUserInvitationsResult, GET_USER_INVITATIONS, UPDATE_INVITATION } from './invitations.api'
import { MockApi, delay } from 'app/mock'

let invitations: GetUserInvitationsResult[] = [
  {
    courseId: 'databaza',
    courseTitle: 'Databaza',
    permission: 'read',
    dateInvited: '01/01/2019'
  },
  {
    courseId: 'siguria',
    courseTitle: 'Siguri',
    permission: 'write',
    dateInvited: '01/01/2019'
  },
  {
    courseId: 'interneti',
    courseTitle: 'Interneti',
    permission: 'read',
    dateInvited: '01/01/2019'
  }
]

export function mockInvitations(api: MockApi) {
  api.withQuery(GET_USER_INVITATIONS, async () => {
    await delay(500)
    return invitations
  })

  api.withAction(UPDATE_INVITATION, async ({ courseId, accepted }) => {
    await delay(500)
    invitations = invitations.filter(inv => inv.courseId !== courseId)
  })
}
