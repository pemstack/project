import React, { FunctionComponent } from 'react'
import { ModalController, useControllerLoading, FormikModal } from 'components/FormikModal'
import { useLoadingAction, useQuery } from 'app'
import { useTranslation } from 'react-i18next'
import { Form, Input, Radio, Select } from 'forms'
import { GET_GROUPS } from 'api/groups.api'
import { GetCourseMembersResult, UPDATE_COURSE_MEMBER } from 'api/members.api'
// import './EditPermissionsModal.css'

const { Option } = Select

interface EditPermissionsModalProps {
  courseId: string
  member: GetCourseMembersResult
  controller: ModalController
}

export const EditPermissionsModal: FunctionComponent<EditPermissionsModalProps> = ({
  courseId,
  member,
  controller
}) => {
  const [updateMember, loading] = useLoadingAction(UPDATE_COURSE_MEMBER) // TODO
  const groups = useQuery(GET_GROUPS, { courseId }).read()
  useControllerLoading(controller, loading)
  const { t } = useTranslation()
  return (
    <FormikModal
      title={t('ManageMembers.edit.title')}
      okText={t('ManageMembers.edit.ok')}
      cancelText={t('ManageMembers.edit.cancel')}
      controller={controller}
      onSubmit={async ({ permission, groups }) => {
        controller.close()
        await updateMember({
          courseId,
          email: member.email,
          permission,
          groups
        })
      }}
      initialValues={{
        permission: member.permission,
        groups: member.groups
      }}
    >
      <Form>
        <Form.Item name='permission' label={t('InviteMembersForm.label.permission')}>
          <Radio.Group
            name='permission'
            options={[
              { label: t('InviteMembersForm.label.read'), value: 'read' },
              { label: t('InviteMembersForm.label.write'), value: 'write' }
            ]}
          />
        </Form.Item>
        <Form.Item name='groups' label={t('ManageMembers.edit.groups')}>
          <Select
            name='groups'
            mode='multiple'
            placeholder={t('ManageMembers.edit.selectGroups')}
            defaultValue={member.groups}
          >
            {groups.map(g => (<Option key={g.groupName} value={g.groupName}>{g.groupName}</Option>))}
          </Select>
        </Form.Item>
      </Form>
    </FormikModal >
  )
}
