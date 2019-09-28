import React, { FunctionComponent } from 'react'
import { Card, Avatar, Skeleton, Dropdown, Menu, Icon } from 'antd'
import './MemberCard.css'
import { CoursePermission } from 'pages/courses/courses.api'

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
        overlay={
          <Menu>
            <Menu.Item onClick={() => onDelete(email)}>
              <Icon type='user-delete' /> {status === 'member' ? 'Remove from class' : 'Cancel invite'}
            </Menu.Item>
          </Menu>
        }
        className='MemberCard__settings'
      >
        <Icon type='setting' />
      </Dropdown>
      <Card.Meta
        avatar={avatar ? <Avatar src={avatar} /> : <Avatar icon='user' />}
        title={name || email}
        description={status + ', ' + permission}
      />
    </Card>
  )
}
