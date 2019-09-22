import React, { FunctionComponent } from 'react'
import './Invitations.css'
import { Card, Button } from 'antd';
import { CoursePermission } from 'pages/courses/courses.api';
import moment from 'moment';

interface InvitationProps {
  courseId: string
  courseTitle: string
  permission: CoursePermission
  dateInvited: string
}

export const Invitation: FunctionComponent<InvitationProps> = ({
  courseId,
  courseTitle,
  permission,
  dateInvited
}) => {
  return (
    <Card className="Invitations">
      <div className="Invitations__buttons">
        <Button type='primary' className="Invitations__accept">Accept</Button>
        <Button type='danger'>Reject</Button>
      </div>
      <h3 className="Invitations__text">
        You have been invited to {courseTitle} on {moment(dateInvited).format('D/MM/Y HH:mm')}
      </h3>
    </Card >
  )
}
