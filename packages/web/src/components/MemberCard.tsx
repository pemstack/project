import React, { FunctionComponent } from 'react'
import { Card, Avatar, Skeleton } from 'antd'
import './MemberCard.css'

export interface MemberCardProps {
  avatar: string
  fullName: string
  role: string
  loading?: boolean
}

export const MemberCard: FunctionComponent<MemberCardProps> = ({
  avatar,
  fullName,
  role,
  loading
}) => {
  if (loading) {
    return (
      <Card
        className='MemberCard'
      >
        <Skeleton active avatar paragraph={{ rows: 1}} />
      </Card>
    )
  }

  return (
    <Card
      className='MemberCard'
      title={
        <Card.Meta
          avatar={<Avatar size={64} icon='user' />} // TODO: <Avatar src='x.png' />
          title={fullName}
          description={role}
        />
      }
      extra={<a href='/'>View Profile</a>}
      bodyStyle={{display: 'none'}}
    >
    </Card>
  )
}
