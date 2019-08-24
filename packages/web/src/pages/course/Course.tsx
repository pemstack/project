import React, { FunctionComponent } from 'react'
import { useQuery } from 'app'
import { Tabs, Button } from 'antd'
import { GET_COURSE_PAGES } from 'api/courses.api'
import { Placeholder } from 'components'
import { CoursePage } from './CoursePage'
import { useTranslation } from 'react-i18next'
import './Course.css'

const { TabPane } = Tabs

interface CourseProps {
  id: string
}

export const Course: FunctionComponent<CourseProps> = ({
  id
}) => {
  const data = useQuery(GET_COURSE_PAGES, { id }).read()
  const { t } = useTranslation()
  // const { data: access } = useQuery(GET_COURSE_ACCESS({ id }))

  // if (loading) {
  //   return <Placeholder block />
  // }

  // if (error) {
  //   return <div>Error...</div>
  // }

  const pageTabs = data.map(p => (
    <TabPane tab={p.title} key={p.id}>
      <CoursePage className='Course__page' courseId={id} pageId={p.id} />
    </TabPane>
  ))

  return (
    <div className='Course'>
      <Tabs
        type='card'
        className='Course__tabs'
      >
        {pageTabs}
      </Tabs>
    </div>
  )
}
