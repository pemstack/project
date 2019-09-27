import React, { FunctionComponent } from 'react'
import { Card, Avatar, Skeleton, Tooltip } from 'antd'
import moment, { Moment } from 'moment'
import { Markdown } from './Markdown'
import { ReadMore } from './ReadMore'
import './NewsfeedPost.css'
import classNames from 'classnames'

export interface NewsfeedPostProps {
  title: string
  date: Date | Moment
  loading?: boolean
  extra?: React.ReactNode
  children?: React.ReactNode
  className?: string
}

export const NewsfeedPost: FunctionComponent<NewsfeedPostProps> = ({
  title,
  date,
  loading,
  extra,
  children,
  className
}) => {
  if (loading) {
    return (
      <Card
        className={classNames('NewsfeedPost', className)}
        bodyStyle={{ padding: 0 }}
      >
        <div className='NewsfeedPost__content'>
          <Skeleton active avatar paragraph={{ rows: 4 }} />
        </div>
      </Card>
    )
  }

  const m = moment(date)

  return (
    <Card
      className={classNames('NewsfeedPost', className)}
      bodyStyle={{ padding: 0 }}
      title={
        <Card.Meta
          avatar={<Avatar icon='user' />}
          title={title}
          description={
            <Tooltip title={m.format('DD/MM/YYYY HH:mm')}>
              {moment.min([m, moment()]).fromNow()}
            </Tooltip>
          }
        />
      }
      extra={extra}
    >
      <div className='NewsfeedPost__content'>
        {children}
      </div>
    </Card>
  )
}
