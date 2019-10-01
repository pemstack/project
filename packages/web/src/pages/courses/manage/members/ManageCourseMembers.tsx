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
      <InviteMembersModal
        visible={showModal}
        onCancel={() => setShowModal(false)}
        onSubmit={({ emails, permission }, actions) => {
          actions.setSubmitting(false)
          inviteMembers({ courseId, emails, permission })
          setShowModal(false)
        }}
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
