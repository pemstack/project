import { Spin } from 'antd'
import { useLoadingAction, useQuery } from 'app'
import React, { FunctionComponent } from 'react'
import { Invitation } from './Invitation'
import {
  GetUserInvitationsResult,
  GET_USER_INVITATIONS,
  UPDATE_INVITATION
} from './invitations.api'

interface InvitationItemProps {
  invitation: GetUserInvitationsResult
}

const InvitationItem: FunctionComponent<InvitationItemProps> = ({
  invitation
}) => {
  const [updateInvitation, loading] = useLoadingAction(UPDATE_INVITATION)
  return (
    <Spin spinning={loading}>
      <Invitation
        courseId={invitation.courseId}
        courseTitle={invitation.courseTitle}
        permission={invitation.permission}
        dateInvited={invitation.dateInvited}
        onAccept={() => updateInvitation({ courseId: invitation.courseId, accepted: true })}
        onDecline={() => updateInvitation({ courseId: invitation.courseId, accepted: false })}
      />
    </Spin>
  )
}

export const InvitationList: FunctionComponent = () => {
  const invitations = useQuery(GET_USER_INVITATIONS).read()
  return (
    <>
      {invitations.map(inv => (
        <InvitationItem key={inv.courseId} invitation={inv} />
      ))}
    </>
  )
}
