import { Tabs } from 'antd'
import { Loading } from 'app/components'
import React, { FunctionComponent, Suspense } from 'react'
import { useTranslation } from 'react-i18next'
import { ManageCourseDetails } from './course-details/ManageCourseDetails'
import { ManageCourseMembers } from './members/ManageCourseMembers'
import { ManageCoursePages } from './pages/ManageCoursePages'
import { ManageCourseGroups } from './groups/ManageCourseGroups'

const { TabPane } = Tabs

export interface ManageCourseProps {
  courseId: string
  courseDisplay: string
}

export const ManageCourse: FunctionComponent<ManageCourseProps> = ({ courseId, courseDisplay }) => {
  const { t } = useTranslation()
  return (
    <div className='ManageCourse.tab.title.details'>
      <Tabs tabPosition='left'>
        <TabPane tab={t('ManageCourse.tab.details')} key='details'>
          <Suspense fallback={<Loading />}>
            <ManageCourseDetails courseId={courseId} courseDisplay={courseDisplay} />
          </Suspense>
        </TabPane>
        <TabPane tab={t('ManageCourse.tab.pages')} key='pages'>
          <Suspense fallback={<Loading />}>
            <ManageCoursePages courseId={courseId} courseDisplay={courseDisplay} />
          </Suspense>
        </TabPane>
        <TabPane tab={t('ManageCourse.tab.members')} key='members'>
          <Suspense fallback={<Loading />}>
            <ManageCourseMembers courseId={courseId} courseDisplay={courseDisplay} />
          </Suspense>
        </TabPane>
        <TabPane tab={t('ManageCourse.tab.groups')} key='groups'>
          <Suspense fallback={<Loading />}>
            <ManageCourseGroups courseId={courseId} courseDisplay={courseDisplay} />
          </Suspense>
        </TabPane>
      </Tabs>
    </div>
  )
}
