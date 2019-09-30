import { Link } from '@pema/router-react'
import { Button, Empty, List, Modal, Select, Tabs } from 'antd'
import { useLoadingAction, useQuery } from 'app'
import { CollapseCard, Flex, LinkButton } from 'components'
import React, { FunctionComponent, useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  DELETE_COURSE_PAGE,
  GET_COURSE_PAGES,
  PageAccess,
  UPDATE_COURSE_PAGE
} from '../courses.api'
import { InviteMembersModal } from '../invite/InviteMembersModal'
import { MemberCardList } from './MemberCardList'
import './ManageCourse.css'

const { confirm } = Modal
const { TabPane } = Tabs
const { Option } = Select

interface ManageCourseProps {
  courseId: string
  courseDisplay: string
}

export const ManageCoursePages: FunctionComponent<ManageCourseProps> = ({
  courseId,
  courseDisplay
}) => {
  const { t } = useTranslation()
  const pages = useQuery(GET_COURSE_PAGES, { courseId }).read()
  const [deleteCoursePage, deleteLoading] = useLoadingAction(DELETE_COURSE_PAGE)
  const [updateCoursePageAccess, updateLoading] = useLoadingAction(UPDATE_COURSE_PAGE)

  return (
    <CollapseCard>
      <List
        rowKey='pageId'
        locale={{
          emptyText: (
            <Empty description={t('ManageCourse.label.noPages')} />
          )
        }}
        loading={deleteLoading || updateLoading}
        dataSource={pages}
        size='large'
        header={
          <Flex justifyContent='space-between' alignItems='center'>
            <h2 className='ManageCourse__title'>
              {t('ManageCourse.title.pages')}
            </h2>
            <LinkButton
              icon='plus'
              type='primary'
              to={`/courses/manage/${courseId}/${courseDisplay}/create-page`}
            >
              {t('button.create')}
            </LinkButton>
          </Flex>
        }
        renderItem={page => (
          <List.Item
            key={page.pageId}
            actions={[
              <Select
                key='visibility'
                size='small'
                dropdownStyle={{ border: 'none' }}
                value={page.access}
                onChange={async (access: PageAccess) => {
                  await updateCoursePageAccess({
                    courseId,
                    pageId: page.pageId,
                    access
                  })
                }}
              >
                <Option value='private'>
                  {t('ManageCourse.label.private')}
                </Option>
                <Option value='public'>
                  {t('ManageCourse.label.public')}
                </Option>
                <Option value='unlisted'>
                  {t('ManageCourse.label.unlisted')}
                </Option>
              </Select>,
              <LinkButton
                to={`/courses/${courseId}/${courseDisplay}/${page.pageId}/edit`}
                type='link'
                key='edit'
                icon='edit'
              />,
              <Button
                type='link'
                key='delete'
                icon='delete'
                className='color-danger'
                onClick={() => {
                  confirm({
                    title: 'Are you sure you want to delete this page?',
                    content: 'Once deleted, you can\'t bring it back',
                    okText: 'Yes',
                    okType: 'danger',
                    cancelText: 'No',
                    onOk() {
                      deleteCoursePage({
                        courseId,
                        pageId: page.pageId
                      })
                    },
                    onCancel() { }
                  })
                }}
              />
            ]}
          >
            <span className='ManageCourse__item-content'>
              <Link to={`/courses/${courseId}/${courseDisplay}/${page.pageId}`}>{page.title}</Link>
            </span>
          </List.Item>
        )}
      />
    </CollapseCard>
  )
}

const ManageCourseMembers: FunctionComponent<ManageCourseProps> = ({
  courseId,
  courseDisplay
}) => {
  const { t } = useTranslation()
  const [loading, setLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)

  return (
    <CollapseCard>
      <InviteMembersModal
        courseId={courseId}
        visible={showModal}
        onClose={() => setShowModal(false)}
        setLoading={setLoading}
      />
      <Flex justifyContent='space-between' alignItems='center'>
        <h2 className='ManageCourse__title'>
          {t('ManageCourse.title.members')}
        </h2>
        <Button
          type='primary'
          icon='plus'
          onClick={() => setShowModal(true)}
        >
          {t('button.invite')}
        </Button>
      </Flex>
      <MemberCardList courseId={courseId} />
    </CollapseCard>
  )
}

export const ManageCourse: FunctionComponent<ManageCourseProps> = ({ courseId, courseDisplay }) => {
  const { t } = useTranslation()
  return (
    <div className='ManageCourse'>
      <Tabs tabPosition='left'>
        <TabPane tab={t('ManageCourse.tab.pages')} key='pages'>
          <ManageCoursePages courseId={courseId} courseDisplay={courseDisplay} />
        </TabPane>
        <TabPane tab={t('ManageCourse.tab.members')} key='members'>
          <ManageCourseMembers courseId={courseId} courseDisplay={courseDisplay} />
        </TabPane>
      </Tabs>
    </div>
  )
}
