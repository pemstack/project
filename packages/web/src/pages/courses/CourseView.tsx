import React, { FunctionComponent, Suspense } from 'react'
import { useQuery } from 'app'
import { Tabs } from 'antd'
import { GET_COURSE_PAGES } from 'api/courses.api'
import { Loading } from 'app/components'
import { CoursePage } from './CoursePage'
import './CourseView.css'

const { TabPane } = Tabs

interface CourseProps {
  id: string
  defaultPage?: string
}

export const CourseView: FunctionComponent<CourseProps> = ({
  id,
  defaultPage
}) => {
  const data = useQuery(GET_COURSE_PAGES, { id }).read()
  const pageTabs = data.map(p => (
    <TabPane tab={p.title} key={p.id}>
      <Suspense fallback={<Loading />}>
        <CoursePage className='CourseView__page' courseId={id} pageId={p.id} />
      </Suspense>
    </TabPane>
  ))

  return (
    <div className='CourseView'>
      <Tabs
        size='large'
        className='CourseView__tabs'
        animated={{
          inkBar: true,
          tabPane: false
        }}
        defaultActiveKey={defaultPage}
      >
        {pageTabs}
      </Tabs>
    </div>
  )
}
