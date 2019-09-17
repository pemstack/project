import React, { FunctionComponent, Suspense } from 'react'
import { useQuery } from 'app'
import { Tabs } from 'antd'
import { Loading } from 'app/components'
import { GET_COURSE_PAGES } from './courses.api'
import { CoursePage } from './CoursePage'
import { Link } from '@pema/router-react'
import { CenterContent } from 'components'
import './ViewCourse.css'

const { TabPane } = Tabs

interface CourseProps {
  courseId: string
  display: string
  page?: string
}

export const ViewCourse: FunctionComponent<CourseProps> = ({
  courseId,
  display,
  page
}) => {
  const pages = useQuery(GET_COURSE_PAGES, { courseId }).read()
  const pageTabs = pages.map(p => (
    <TabPane
      tab={
        <Link
          replace
          to={`/courses/${courseId}/${display}/${p.pageId}`}
          className='ViewCourse__tab-link'
        >
          {p.title}
        </Link>
      }
      key={p.pageId}
    >
      <Suspense fallback={<Loading />}>
        <CoursePage
          className='ViewCourse__page'
          courseId={courseId}
          pageId={p.pageId}
        />
      </Suspense>
    </TabPane>
  ))

  return (
    <div className='ViewCourse'>
      <CenterContent>
        <Tabs
          size='large'
          className='ViewCourse__tabs'
          tabBarGutter={0}
          animated={{
            inkBar: true,
            tabPane: false
          }}
          activeKey={page || (pages[0] && pages[0].pageId)}
        >
          {pageTabs}
        </Tabs>
      </CenterContent>
    </div>
  )
}
