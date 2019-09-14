import React, { FunctionComponent, Suspense } from 'react'
import { useQuery } from 'app'
import { Tabs } from 'antd'
import { Loading } from 'app/components'
import { GET_COURSE_PAGES } from './courses.api'
import { CoursePage } from './CoursePage'
import './ViewCourse.css'

const { TabPane } = Tabs

interface CourseProps {
  id: string
  defaultPage?: string
}

export const ViewCourse: FunctionComponent<CourseProps> = ({
  id,
  defaultPage
}) => {
  const data = useQuery(GET_COURSE_PAGES, { id }).read()
  const pageTabs = data.map(p => (
    <TabPane tab={p.title} key={p.pageId}>
      <Suspense fallback={<Loading />}>
        <CoursePage
          className='ViewCourse__page'
          courseId={id}
          pageId={p.pageId}
        />
      </Suspense>
    </TabPane>
  ))

  return (
    <div className='ViewCourse'>
      <Tabs
        size='large'
        className='ViewCourse__tabs'
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
