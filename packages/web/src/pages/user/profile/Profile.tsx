import React, { FunctionComponent } from 'react'
import { Card, Descriptions, Spin } from 'antd'
import { useTranslation } from 'react-i18next'
import { UserInfo } from 'api/user.api'
import { LinkButton } from 'components'
import './Profile.css'

export interface ProfileItem {
  id: string
  firstName: string
  lastName: string
  email: string
}

export interface ProfileProps {
  item: ProfileItem | null
  loading?: boolean
}

export const Profile: FunctionComponent<ProfileProps> = ({
  item,
  loading
}) => {
  const { t } = useTranslation()
  const loader = (!item || loading) ? <Spin /> : null
  return (
    <Card className='Profile'>
      <Descriptions
        title={t('user.label.profile')}
        bordered
        column={{ xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }}
      >
        <Descriptions.Item label={t('user.label.name')}>
          {loader || `${item!.firstName} ${item!.lastName}`}
        </Descriptions.Item>
        <Descriptions.Item label={t('user.label.email')}>
          {loader || item!.email}
        </Descriptions.Item>
      </Descriptions>
      <LinkButton type='primary' to='/user/profile/edit'>
        {t('button.edit')}
      </LinkButton>
    </Card>
  )
}
