import React, { FunctionComponent } from 'react'
import { Timeline, Icon } from 'antd'
import { parseProps } from './parse-props'
import './TimelineRenderer.css'

interface TimelineRendererProps {
  timeline: string
  alt?: boolean
}

const { Item } = Timeline

function asStr(x: any): string | undefined {
  return typeof x === 'string' ? x : undefined
}

export const TimelineRenderer: FunctionComponent<TimelineRendererProps> = React.memo(({
  timeline = '',
  alt
}) => {
  const items = timeline
    .split(/(\r?\n)/g)
    .map(x => parseProps(x))
    .filter(x => x[1])

  return (
    <Timeline className='TimelineRenderer' mode={alt ? 'alternate' : 'left'}>
      {items.map(([props, label], index) => {
        const position = /left|right/.test(asStr(props.position) as string)
          ? props.position as 'left' | 'right'
          : undefined
        const icon = asStr(props.icon) === 'clock' ? 'clock-circle-o' : undefined

        return (
          <Item
            key={index}
            color={asStr(props.color)}
            position={position}
            dot={icon ? <Icon type={icon} /> : undefined}
          >
            {label}
          </Item>
        )
      })}
    </Timeline>
  )
})

export default TimelineRenderer
