import { Button, Empty, List, Modal } from 'antd'
import { DELETE_GROUP, GET_GROUPS } from 'api/groups.api'
import { useLoadingAction, useQuery } from 'app'
import { CollapseCard, Flex } from 'components'
import { useModalController } from 'components/FormikModal'
import React, { FunctionComponent } from 'react'
import { useTranslation } from 'react-i18next'
import { CreateGroupModal } from './CreateGroupModal'
import './ManageCourseGroups.css'

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
  const createGroupModal = useModalController()
  const { t } = useTranslation()
  return (
    <CollapseCard>
      <CreateGroupModal
        controller={createGroupModal}
        courseId={courseId}
      />
      <Flex className='ManageCourseGroups__top-bar' justifyContent='space-between' alignItems='flex-start'>
        <h2 className='ManageCourseGroups__title'>
          {t('ManageCourse.title.groups')}
        </h2>
        <Button
          icon='plus'
          type='primary'
          onClick={() => createGroupModal.open()}
        >
          {t('button.create')}
        </Button>
      </Flex>
      <List
        rowKey='groupName'
        locale={{
          emptyText: (
            <Empty description={t('ManageCourse.label.noGroups')} />
          )
        }}
        loading={deleteLoading || createGroupModal.loading}
        dataSource={groups}
        size='large'
        renderItem={group => (
          <List.Item
            key={group.groupName}
            actions={[(
              <Button
                type='link'
                key='delete'
                icon='delete'
                className='color-danger'
                onClick={() => {
                  confirm({
                    title: t('ManageGroups.delete.title'),
                    content: t('ManageGroups.delete.subtitle'),
                    okText: t('ManageGroups.delete.ok'),
                    okType: 'danger',
                    cancelText: t('ManageGroups.delete.cancel'),
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
            )]}
          >
            <span className='ManageCourseGroups__item-content'>
              {group.groupName}
            </span>
          </List.Item>
        )}
      />
    </CollapseCard>
  )
}
