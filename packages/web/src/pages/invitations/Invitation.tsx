import React, { FunctionComponent } from 'react'
import './Invitations.css'
import { Card, Button } from 'antd';
import { CoursePermission } from 'pages/courses/courses.api';
import moment from 'moment';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation()
  return (
    <Card className="Invitations">
      <div className="Invitations__buttons">
        <Button type='primary' className="Invitations__accept">{t('button.accept')}</Button>
        <Button type='danger'>{t('button.reject')}</Button>
      </div>
      <h3 className="Invitations__text">
        {t('Invitation.text', { title: courseTitle, time: moment(dateInvited).format('D/MM/Y HH:mm') })}
      </h3>
    </Card >
  )
}
