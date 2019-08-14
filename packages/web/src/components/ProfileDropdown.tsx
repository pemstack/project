import React, { FunctionComponent } from 'react'
import { Dropdown, Menu, Icon, Avatar } from 'antd'
import { useTranslation } from 'react-i18next'

interface ProfileDropdownProps { }

export const ProfileDropdown: FunctionComponent<ProfileDropdownProps> = ({ }) => {
  return (
    <Dropdown overlay={<ProfileMenu />}>
      <Avatar size='large' icon='user' />
    </Dropdown>
  )
}

// TODO use LinkButton here
export const ProfileMenu: FunctionComponent = () => {
  const { t } = useTranslation()
  return (
    <Menu>
      <Menu.Item key='settings'>
        <a target='_blank' rel='noopener noreferrer' href='#'>
          <Icon type='setting' /> {t('user.label.settings')}
        </a>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key='logout'>
        <a target='_blank' rel='noopener noreferrer' href='#'>
          <Icon type='logout' /> {t('user.label.logout')}
        </a>
      </Menu.Item>
    </Menu>
  )
}
