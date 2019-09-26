import React, { FunctionComponent, Suspense } from 'react'
import { useQuery } from 'app'
import { Tabs } from 'antd'
import { Loading } from 'app/components'
import { GET_COURSE_PAGES } from '../courses.api'
import { CoursePage } from '../view-page/CoursePage'
import { Link } from '@pema/router-react'
import { CenterContent } from 'components'
import './ViewCourse.css'
import { useTranslation } from 'react-i18next'
import { Newsfeed } from '../newsfeed/Newsfeed'

const { TabPane } = Tabs

interface CourseProps {
  courseId: string
  courseDisplay: string
  page?: string
  pageNumber?: number
}

export const ViewCourse: FunctionComponent<CourseProps> = ({
  courseId,
  courseDisplay,
  page,
  pageNumber = 1
}) => {
  const { t } = useTranslation()
  const pages = useQuery(GET_COURSE_PAGES, { courseId }).read()
  const pageTabs = pages.map(p => (
    <TabPane
      tab={
        <Link
          replace
          to={`/courses/${courseId}/${courseDisplay}/${p.pageId}`}
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

  pageTabs.unshift(
    <TabPane
      tab={
        <Link
          to={`/courses/${courseId}/${courseDisplay}`}
          className='ViewCourse__tab-link'
        >
          {t('Layout.label.newsfeed')}
        </Link>
      }
      key={'newsfeed'}
    >
      <Suspense fallback={<Loading />}>
        <Newsfeed
          courseId={courseId}
          courseDisplay={courseDisplay}
          page={pageNumber}
        />
      </Suspense>
    </TabPane>
  )

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
          activeKey={page || 'newsfeed'}
        >
          {pageTabs}
        </Tabs>
      </CenterContent>
    </div>
  )
}
