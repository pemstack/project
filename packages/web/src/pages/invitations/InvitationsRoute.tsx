import React from 'react'
import { View, useQuery, authorize, view } from 'app'
import { Invitation } from './Invitation'
import { GET_USER_INVITATIONS } from './invitations.api'


export const InvitationsRoute: View = ({ }) => {
  const invitations = useQuery(GET_USER_INVITATIONS).read()
  return (
    <>
      {invitations.map((inv) =>
        (
          <div key={inv.courseId}>
            <Invitation
              courseId={inv.courseId}
              courseTitle={inv.courseTitle}
              permission={inv.permission}
              dateInvited={inv.dateInvited} />
          </div>
        ))}
    </>
  )
}

export default authorize({
  action: view(InvitationsRoute)
})
