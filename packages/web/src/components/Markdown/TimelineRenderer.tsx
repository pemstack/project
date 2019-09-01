import React, { FunctionComponent } from 'react'
import { Timeline } from 'antd'

interface TimelineRendererProps {
  timeline: string
  alternate?: boolean
}

const { Item } = Timeline

// function extract(item: string) {
//   const match = item.match(/^\s*\[\]\s*/)
//   if (match) {

//   } else {

//   }
// }

// [color:green icon:clock] Testi i pare

export const TimelineRenderer: FunctionComponent<TimelineRendererProps> = React.memo(({
  timeline = '',
  alternate
}) => {
  const items = timeline.split(/(\r?\n)/g).map(x => x.trim()).filter(x => x)
  return (
    <Timeline mode={alternate ? 'alternate' : 'right'}>
      {items.map((item, index) => <Item key={index}>{item}</Item>)}
    </Timeline>
  )
})
