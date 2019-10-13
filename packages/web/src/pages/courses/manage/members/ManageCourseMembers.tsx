import { Button } from 'antd'
import { useLoadingAction } from 'app'
import { CollapseCard, Flex } from 'components'
import React, { FunctionComponent, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { INVITE_MEMBERS } from '../../courses.api'
import { InviteMembersModal } from '../../invite/InviteMembersModal'
import { ManageCourseProps } from '../ManageCourse'
import { MemberCardList } from '../MemberCardList'

export const ManageCourseMembers: FunctionComponent<ManageCourseProps> = ({
  courseId,
  courseDisplay
}) => {
  const { t } = useTranslation()
  const [showModal, setShowModal] = useState(false)
  const [inviteMembers, loading] = useLoadingAction(INVITE_MEMBERS)

  return (
    <CollapseCard>
      <Flex justifyContent='space-between' alignItems='flex-start'>
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
      <InviteMembersModal
        visible={showModal}
        onCancel={() => setShowModal(false)}
        onSubmit={({ emails, permission, group }, actions) => {
          actions.setSubmitting(false)
          inviteMembers({ courseId, emails, permission, group })
          setShowModal(false)
        }}
        courseId={courseId}
      />
    </CollapseCard>
  )
}
