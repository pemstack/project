import React, { FunctionComponent } from 'react'
import { Dropdown, Menu, Icon, Avatar } from 'antd'
import { useTranslation } from 'react-i18next'
import { Link } from '@pema/router-react'

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
  return (
    <Menu>
      <Menu.Item key='settings'>
        <Link to='/user/profile'>
          <Icon type='setting' /> {t('user.label.settings')}
        </Link>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key='logout'>
        <Link to='/user/profile'>
          <Icon type='logout' /> {t('user.label.logout')}
        </Link>
      </Menu.Item>
    </Menu>
  )
}
