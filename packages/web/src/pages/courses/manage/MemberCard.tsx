import { Avatar, Card, Dropdown, Icon, Menu } from 'antd'
import { CoursePermission } from 'api/courses.api'
import React, { FunctionComponent } from 'react'
import './MemberCard.css'

export interface MemberCardItem {
  avatar: string
  fullName: string
  role: string
}

export interface MemberCardProps {
  name: string | null
  email: string
  permission: CoursePermission
  status: 'member' | 'invited'
  avatar?: string
  onDelete: (email: string) => void
}

function formatName(
  name: string | null,
  email: string
): string | undefined {
  if (name && email) {
    return `${name} (${email})`
  } else {
    return email || name || undefined
  }
}

export const MemberCard: FunctionComponent<MemberCardProps> = ({
  name,
  email,
  permission,
  status,
  avatar,
  onDelete
}) => {
  return (
    <Card className='MemberCard'>
      <Dropdown
        overlay={(
          <Menu>
            <Menu.Item onClick={() => onDelete(email)}>
              <Icon type='user-delete' /> {status === 'member' ? 'Remove from class' : 'Cancel invite'}
            </Menu.Item>
          </Menu>
        )}
        className='MemberCard__settings'
      >
        <Icon type='setting' />
      </Dropdown>
      <Card.Meta
        avatar={avatar ? <Avatar src={avatar} /> : <Avatar icon='user' />}
        title={<span title={formatName(name, email)}>{name || email}</span>}
        description={status + ', ' + permission}
      />
    </Card>
  )
}
