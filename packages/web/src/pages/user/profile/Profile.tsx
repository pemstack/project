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
    <Card className='Profile' bodyStyle={{ padding: 0 }}>
      <Descriptions
        title={t('Profile.label.profile')}
        bordered
        column={{ xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }}
      >
        <Descriptions.Item label={t('Profile.label.name')}>{firstName} {lastName}</Descriptions.Item>
        <Descriptions.Item label={t('Profile.label.email')}>{email}</Descriptions.Item>
        <Descriptions.Item label={t('Profile.label.role')}>{roles.join(', ')}</Descriptions.Item>
      </Descriptions>
    </Card>
  )
}
