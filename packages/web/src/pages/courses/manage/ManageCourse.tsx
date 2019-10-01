import { Link } from '@pema/router-react'
import { Button, Empty, List, Modal, Select, Tabs } from 'antd'
import { useLoadingAction, useQuery } from 'app'
import { CollapseCard, Flex, LinkButton } from 'components'
import React, { FunctionComponent, useState, Suspense } from 'react'
import { useTranslation } from 'react-i18next'
import {
  DELETE_COURSE_PAGE,
  GET_COURSE_PAGES,
  PageAccess,
  UPDATE_COURSE_PAGE,
  INVITE_MEMBERS
} from '../courses.api'
import { ManageCoursePages } from './pages/ManageCoursePages'
import { ManageCourseMembers } from './members/ManageCourseMembers'
import { ManageCourseDetails } from './course-details/ManageCourseDetails'
import { Loading } from 'app/components'

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
      </Tabs>
    </div>
  )
}
