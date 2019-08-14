import React, { FunctionComponent } from 'react'
import { Dropdown, Menu, Icon, Avatar } from 'antd'

interface ProfileDropdownProps { }

export const ProfileDropdown: FunctionComponent<ProfileDropdownProps> = ({ }) => {
  return (
    <Dropdown overlay={ProfileMenu}>
      <Avatar size='large' icon="user" />
    </Dropdown>
  )
}

// TODO use LinkButton here
export const ProfileMenu: FunctionComponent = () => {
  return (
    <Menu>
      <Menu.Item key='settings'>
        <a target="_blank" rel="noopener noreferrer" href="#">
          <Icon type="setting" /> Account Settings
        </a>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key='logout'>
        <a target="_blank" rel="noopener noreferrer" href="#">
          <Icon type="logout" /> Log Out
        </a>
      </Menu.Item>
    </Menu>
  )
}
