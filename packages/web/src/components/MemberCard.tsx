import React, { FunctionComponent } from 'react'
import { Card, Avatar, Skeleton } from 'antd'
import './MemberCard.css'

export interface MemberCardProps {
  avatar: string
  fullName: string
  role: string
  loading?: boolean
  style?: React.CSSProperties
}

export const MemberCard: FunctionComponent<MemberCardProps> = ({
  avatar,
  fullName,
  role,
  loading,
  style
}) => {
  if (loading) {
    return (
      <Card
        style={style}
        className='MemberCard'
      >
        <Skeleton active avatar={{size: 'large'}} paragraph={{ rows: 1, width: 60}} />
      </Card>
    )
  }

  return (
    <Card
      style={style}
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
