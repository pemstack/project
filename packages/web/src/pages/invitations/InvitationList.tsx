import React, { FunctionComponent } from 'react'
import { GET_USER_INVITATIONS, UPDATE_INVITATION } from './invitations.api'
import { useQuery, useAction } from 'app'
import { Invitation } from './Invitation'

interface InvitationListProps { }

export const InvitationList: FunctionComponent<InvitationListProps> = ({ }) => {
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
