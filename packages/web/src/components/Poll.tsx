import React, { FunctionComponent } from 'react'
import { CollapseCard } from 'components'
import { Card } from 'antd'
import './Poll.css'
import styled, { keyframes } from 'styled-components'



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
  
  const percentage = keyframes`
    0% {width:0}
    ${100 * item.votes / total}% {width:${100 * item.votes / total}%}
  `

  const Bar = styled.div`
    animation: ${percentage} 1.2s ease-in-out;
  `

  if(!hidden){
    return (
      <Card
        className='Card'
        bodyStyle={{ padding: '4px 8px' }}
        hoverable
      >
        <Bar
          style={{
            position: 'absolute',
            background: '#a6c8e3',
            left: 0,
            top: 0,
            width: `${100 * item.votes / total}%`,
            height: '100%',
            zIndex:'1',
          }}
        />
        <div style={{ float: 'right' }}>
          {item.votes}
        </div>
        <div style={{position:'absolute',zIndex:'1'}}>{item.label}</div>
      </Card>
    )
  }
  return(
    <Card
        className='Card'
        bodyStyle={{ padding: '4px 8px'}}
        hoverable
      >
      <div>{item.label}</div>
      </Card>
  )
}

export interface PollProps {
  title?: string
  items: PollItem[]
  Submitted?:boolean
}

export const Poll: FunctionComponent<PollProps> = ({
  title,
  items,
  Submitted
}) => {
  const total = items.reduce((sum, current) => sum + current.votes, 0)
  if(Submitted){
    return (
      <div className='Poll'>
        {title && <h3>{title}</h3>}
        {items.map((item, index) => (
            <PollItem key={index} item={item} total={total}/>
        ))}
      </div>
    )
  }
  return (
    <div className='Poll'>
      {title && <h3>{title}</h3>}
      {items.map((item, index) => (
          <PollItem key={index} item={item} total={total} hidden/>
      ))}
    </div>
  )
}
