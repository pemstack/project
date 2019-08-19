import React, { FunctionComponent } from 'react'
import { Dropdown, Menu, Icon, Avatar, Spin } from 'antd'
import { useTranslation } from 'react-i18next'
import { Link } from '@pema/router-react'
import { useAction, useQuery } from 'app'
import { LOGOUT, GET_CURRENT_USER } from 'api/user.api'
import './ProfileDropdown.css'

export const ProfileDropdownConnector: FunctionComponent = () => {
  const { data: user, loading, error } = useQuery(GET_CURRENT_USER)
  if (loading) {
    return <Spin size='small' />
  }

  if (!user || error) {
    return null
  }

  return (
    <ProfileDropdown name={user.firstName + ' ' + user.lastName} />
  )
}

interface ProfileDropdownProps {
  name: string
}

export const ProfileDropdown: FunctionComponent<ProfileDropdownProps> = ({
  name
}) => {
  return (
    <Dropdown overlay={<ProfileMenu />}>
      <div className='ProfileDropdown__trigger'>
        <Avatar className='ProfileDropdown__avatar' size='small' icon='user' />
        <span className='ProfileDropdown__name'>{name}</span>
      </div>
    </Dropdown>
  )
}

export const ProfileMenu: FunctionComponent = () => {
  const { t } = useTranslation()
  const logout = useAction(LOGOUT)

  return (
    <Menu>
      <Menu.Item key='settings'>
        <Link to='/user/profile'>
          <Icon type='setting' /> {t('user.label.settings')}
        </Link>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key='logout'>
        <Link
          to='/user/logout'
          onClick={e => {
            e.preventDefault()
            logout('/')
          }}
        >
          <Icon type='logout' /> {t('user.label.logout')}
        </Link>
      </Menu.Item>
    </Menu>
  )
}
