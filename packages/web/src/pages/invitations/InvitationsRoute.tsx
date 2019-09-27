import { authorize, useAction, useQuery, View, view } from 'app'
import React from 'react'
import { Invitation } from './Invitation'
import { GET_USER_INVITATIONS, UPDATE_INVITATION } from './invitations.api'

export const InvitationsRoute: View = () => {
  const invitations = useQuery(GET_USER_INVITATIONS).read()
  const updateInvitation = useAction(UPDATE_INVITATION)
  return (
    <>
      {invitations.map((inv) =>
        (
          <div key={inv.courseId}>
            <Invitation
              courseId={inv.courseId}
              courseTitle={inv.courseTitle}
              permission={inv.permission}
              dateInvited={inv.dateInvited}
              onAccept={() => updateInvitation({ courseId: inv.courseId, accepted: true })}
              onDecline={() => updateInvitation({ courseId: inv.courseId, accepted: false })}
            />
          </div>
        ))}
    </>
  )
}

export default authorize({
  action: view(InvitationsRoute)
})
