import React, { FunctionComponent } from 'react'
import { Card, Descriptions, Spin } from 'antd'
import { useTranslation } from 'react-i18next'
import { LinkButton } from 'components'
import './ProfileView.css'

export interface ProfileViewItem {
  id: string
  firstName: string
  lastName: string
  email: string
}

export interface ProfileViewProps {
  item: ProfileViewItem | null
  loading?: boolean
}

export const ProfileView: FunctionComponent<ProfileViewProps> = ({
  item,
  loading
}) => {
  const { t } = useTranslation()
  const loader = (!item || loading) ? <Spin /> : null
  return (
    <Card className='ProfileView'>
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
