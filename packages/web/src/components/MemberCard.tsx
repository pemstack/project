import React, { FunctionComponent } from 'react'
import { Card, Avatar, Skeleton } from 'antd'
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
}

export const MemberCard: FunctionComponent<MemberCardProps> = ({
  item: {
    avatar,
    fullName,
    role
  },
  loading,
  style
}) => {
  return (
    <Card style={style} className='MemberCard'>
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
