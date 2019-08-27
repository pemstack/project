import React, { FunctionComponent } from 'react'
import { useQuery } from 'app'
import { Tabs, Button } from 'antd'
import { GET_COURSE_PAGES } from 'api/courses.api'
import { Placeholder } from 'components'
import { CoursePage } from './CoursePage'
import { useTranslation } from 'react-i18next'
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
  const { t } = useTranslation()

  const pageTabs = data.map(p => (
    <TabPane tab={p.title} key={p.id}>
      <CoursePage className='CourseView__page' courseId={id} pageId={p.id} />
    </TabPane>
  ))

  return (
    <div className='CourseView'>
      <Tabs
        type='card'
        className='CourseView__tabs'
        defaultActiveKey={defaultPage}
      >
        {pageTabs}
      </Tabs>
    </div>
  )
}
