import React, { FunctionComponent } from 'react'
import { Card, Avatar, Skeleton, Dropdown, Menu, Icon } from 'antd'
import './MemberCard.css'

export interface MemberCardItem {
  avatar: string
  fullName: string
  role: string
}

export interface MemberCardProps {
  item: MemberCardItem
  loading?: boolean
  style?: React.CSSProperties
  kickable?: boolean
}

export const MemberCard: FunctionComponent<MemberCardProps> = ({
  item: {
    avatar,
    fullName,
    role
  },
  loading,
  style,
  kickable
}) => {
  return (
    <Card style={style} className='MemberCard'>
      {kickable &&
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item>
                <Icon type='user-delete' /> Remove from class
              </Menu.Item>
            </Menu>
          }
          className='MemberCard__settings'
        >
          <Icon type='setting' />
        </Dropdown>
      }
      {loading
        ? (
          <Skeleton
            active
            avatar={{ size: 'large' }}
            paragraph={{ rows: 1, width: 80 }}
          />
        )
        : (
          <Card.Meta
            avatar={<Avatar size='large' icon='user' />}
            title={fullName}
            description={role}
          />
        )}

    </Card>
  )
}
