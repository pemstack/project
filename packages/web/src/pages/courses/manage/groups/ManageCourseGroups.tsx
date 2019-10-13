import React, { FunctionComponent, useState } from 'react'
import { CollapseCard, Flex } from 'components'
import { List, Empty, Button, Modal } from 'antd'
import { useLoadingAction, useQuery } from 'app'
import { useTranslation } from 'react-i18next'
import { GET_GROUPS, DELETE_GROUP } from 'pages/courses/courses.api'
import './ManageCourseGroups.css'
import { CreateGroupModal } from './CreateGroupModal'

const { confirm } = Modal

interface ManageCourseGroupsProps {
  courseId: string
  courseDisplay: string
}

export const ManageCourseGroups: FunctionComponent<ManageCourseGroupsProps> = ({
  courseId,
  courseDisplay
}) => {
  const groups = useQuery(GET_GROUPS, { courseId }).read()
  const [deleteGroup, deleteLoading] = useLoadingAction(DELETE_GROUP)
  const [showModal, setShowModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const { t } = useTranslation()
  return (
    <CollapseCard>
      <CreateGroupModal
        courseId={courseId}
        visible={showModal}
        onClose={() => setShowModal(false)}
        setLoading={setLoading}
      />
      <List
        rowKey='groupName'
        locale={{
          emptyText: (
            <Empty description={t('ManageCourse.label.noGroups')} />
          )
        }}
        loading={deleteLoading}
        dataSource={groups}
        size='large'
        header={
          <Flex justifyContent='space-between' alignItems='center'>
            <h2 className='ManageCourseGroups__title'>
              {t('ManageCourse.title.groups')}
            </h2>
            <Button
              icon='plus'
              type='primary'
              onClick={() => setShowModal(true)}
            >
              {t('button.create')}
            </Button>
          </Flex>
        }
        renderItem={group => (
          <List.Item
            key={group.groupName}
            actions={[
              <Button
                type='link'
                key='delete'
                icon='delete'
                className='color-danger'
                onClick={() => {
                  confirm({
                    title: 'Are you sure you want to delete this group?', // todo t()
                    content: 'Once deleted, you can\'t bring it back',
                    okText: 'Yes',
                    okType: 'danger',
                    cancelText: 'No',
                    onOk() {
                      deleteGroup({
                        courseId,
                        groupName: group.groupName
                      })
                    },
                    onCancel() { }
                  })
                }}
              />
            ]}
          >
            <span className='ManageCourseGroups__item-content'>
              {group.groupName}
            </span>
          </List.Item>
        )}
      ></List>
    </CollapseCard>
  )
}
