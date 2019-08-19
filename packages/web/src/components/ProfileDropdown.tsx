import React, { FunctionComponent } from 'react'
import { Dropdown, Menu, Icon, Avatar } from 'antd'
import { useTranslation } from 'react-i18next'
import { Link } from '@pema/router-react'
import { useAction } from 'app'
import { LOGOUT } from 'api/user.api'

interface ProfileDropdownProps { }

export const ProfileDropdown: FunctionComponent<ProfileDropdownProps> = () => {
  return (
    <Dropdown overlay={<ProfileMenu />}>
      <Avatar size='large' icon='user' />
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
