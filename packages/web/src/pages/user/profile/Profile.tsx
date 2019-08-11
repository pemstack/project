import React, { FunctionComponent } from 'react'
import { Card, Descriptions } from 'antd'
import { useTranslation } from 'react-i18next'
import { UserInfo } from 'api/user.api'
import './Profile.css'

export interface ProfileItem {
  id: string
  firstName: string
  lastName: string
  email: string
  roles: string[]
}

export interface ProfileProps {
  item: ProfileItem
}

export const Profile: FunctionComponent<ProfileProps> = ({
  item: {
    id,
    firstName,
    lastName,
    email,
    roles
  }
}) => {
  const { t } = useTranslation()
  return (
    <Card className='Profile'>
      <Descriptions
        title={t('user.label.profile')}
        bordered
        column={{ xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }}
      >
        <Descriptions.Item label={t('user.label.name')}>{firstName} {lastName}</Descriptions.Item>
        <Descriptions.Item label={t('user.label.email')}>{email}</Descriptions.Item>
        <Descriptions.Item label={t('user.label.role')}>{roles.join(', ')}</Descriptions.Item>
      </Descriptions>
    </Card>
  )
}
