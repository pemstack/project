import { Button, Card } from 'antd'
import { CoursePermission } from 'api/courses.api'
import moment from 'moment'
import React, { FunctionComponent } from 'react'
import { useTranslation } from 'react-i18next'
import './Invitation.css'

interface InvitationProps {
  courseId: string
  courseTitle: string
  permission: CoursePermission
  dateInvited: string
  onAccept?: () => void
  onDecline?: () => void
}

export const Invitation: FunctionComponent<InvitationProps> = ({
  courseId,
  courseTitle,
  permission,
  dateInvited,
  onAccept,
  onDecline
}) => {
  const { t } = useTranslation()
  return (
    <Card className='Invitation'>
      <div className='Invitation__buttons'>
        <Button
          type='primary'
          className='Invitation__accept'
          onClick={onAccept}
        >
          {t('button.accept')}
        </Button>
        <Button
          type='danger'
          onClick={onDecline}
        >
          {t('button.reject')}
        </Button>
      </div>
      <h3 className='Invitation__text'>
        {t('Invitation.text', { title: courseTitle, time: moment(dateInvited).format('DD/MM/YY HH:mm') })}
      </h3>
    </Card >
  )
}
