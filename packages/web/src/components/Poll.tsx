import React, { FunctionComponent } from 'react'
import { Card } from 'antd'
import './Poll.css'

export interface PollItem {
  label: string
  votes: number
}

export interface PollItemProps {
  item: PollItem
  total: number
  hidden?: boolean
}

export const PollItem: FunctionComponent<PollItemProps> = ({
  item,
  total,
  hidden
}) => {
  if (!hidden) {
    return (
      <Card
        className='Card'
        bodyStyle={{ padding: '4px 8px' }}
        hoverable
      >
        <div
          style={{
            position: 'absolute',
            background: '#c0e0f0',
            left: 0,
            top: 0,
            width: `${100 * item.votes / total}%`,
            height: '100%',
            zIndex: '1'
          }}
        />
        <div style={{ float: 'right' }}>
          {item.votes}
        </div>
        <div style={{ position: 'absolute', zIndex: 1 }}>{item.label}</div>
      </Card>
    )
  }
  return (
    <Card
      className='Card'
      bodyStyle={{ padding: '4px 8px' }}
      hoverable
    >
      <div>{item.label}</div>
    </Card>
  )
}

export interface PollProps {
  title?: string
  items: PollItem[]
  Submitted?: boolean
}

export const Poll: FunctionComponent<PollProps> = ({
  title,
  items,
  Submitted
}) => {
  const total = items.reduce((sum, current) => sum + current.votes, 0)
  if (Submitted) {
    return (
      <div className='Poll'>
        {title && <h3>{title}</h3>}
        {items.map((item, index) => (
          <PollItem key={index} item={item} total={total} />
        ))}
      </div>
    )
  }
  return (
    <div className='Poll'>
      {title && <h3>{title}</h3>}
      {items.map((item, index) => (
        <PollItem key={index} item={item} total={total} hidden />
      ))}
    </div>
  )
}
