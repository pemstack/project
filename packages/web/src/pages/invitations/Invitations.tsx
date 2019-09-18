import React, { FunctionComponent } from 'react'
import './Invitations.css'
import { Card, Button } from 'antd';
import { CoursePermission } from 'pages/courses/courses.api';

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
    <Card>
      {courseTitle} - {permission} - {dateInvited} - <Button type='primary'>Accept</Button> - <Button type='danger'>Reject</Button>
    </Card>
  )
}
