import React, { FunctionComponent } from 'react'
import { CollapseCard } from 'components'
import { Card } from 'antd'
import './Poll.css'

export interface PollItem {
  label: string
  votes: number
}

export interface PollItemProps {
  item: PollItem
  total: number
}

export const PollItem: FunctionComponent<PollItemProps> = ({
  item,
  total
}) => {
  return (
    <Card
      bodyStyle={{ padding: '4px 8px' }}
      hoverable
    >
      <div
        style={{
          position: 'absolute',
          background: 'green',
          left: 0,
          top: 0,
          width: `${100 * item.votes / total}%`,
          height: '100%'
        }}
      />
      <div style={{ float: 'right' }}>
        {item.votes}
      </div>
      {item.label}
    </Card>
  )
}

export interface PollProps {
  title?: string
  items: PollItem[]
}

export const Poll: FunctionComponent<PollProps> = ({
  title,
  items
}) => {
  const total = items.reduce((sum, current) => sum + current.votes, 0)
  return (
    <div className='Poll'>
      {title && <h3>{title}</h3>}
      {items.map((item, index) => (
        <PollItem key={index} item={item} total={total} />
      ))}
    </div>
  )
}
