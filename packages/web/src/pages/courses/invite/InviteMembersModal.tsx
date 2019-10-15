import React, { FunctionComponent } from 'react'
import { Formik, Form, EmailSelect, Radio, FormikActions } from 'forms'
import { Modal } from 'antd'
import { useTranslation } from 'react-i18next'
import { useQuery } from 'app'
import { GET_GROUPS } from '../courses.api'
import { CheckboxOptionType } from 'antd/lib/checkbox'

interface InviteMembersModalValues {
  emails: string[]
  permission: 'read' | 'write'
  group: string
}

export interface InviteMembersModalProps {
  visible: boolean
  onSubmit(values: InviteMembersModalValues, actions: FormikActions<InviteMembersModalValues>): void
  onCancel(): void
  courseId: string
}

const children: Array<any> = []

export const InviteMembersModal: FunctionComponent<InviteMembersModalProps> = ({
  visible,
  onSubmit,
  onCancel,
  courseId
}) => {
  const { t } = useTranslation()
  const groupsResult = useQuery(GET_GROUPS, { courseId }).read()
  const groups: any[] = []
  groupsResult.forEach(group =>
    groups.push({ label: group.groupName, value: group.groupName })
  )
  return (
    <Formik
      onSubmit={onSubmit}
      initialValues={{
        emails: [],
        permission: 'read',
        group: ''
      }}
      render={props => (
        <Modal
          title={t('InviteMembersForm.title')}
          visible={visible}
          onCancel={onCancel}
          onOk={() => {
            props.submitForm()
          }}
        >
          <Form>
            <Form.Item name='emails'>
              <EmailSelect
                name='emails'
                placeholder={t('InviteMembersForm.placeholder')}
                style={{ width: '100%' }}
              >
                {children}
              </EmailSelect>
            </Form.Item>
            <Form.Item name='permission' label={t('InviteMembersForm.label.permission')}>
              <Radio.Group
                name='permission'
                options={[
                  { label: t('InviteMembersForm.label.read'), value: 'read' },
                  { label: t('InviteMembersForm.label.write'), value: 'write' }
                ]}
              />
            </Form.Item>
            {groups.length > 0 && <Form.Item name='groups' label={t('InviteMembersForm.label.groups')}>
              <Radio.Group
                name='group'
                options={groups}
              />
            </Form.Item>}
          </Form>
        </Modal>
      )}
    />
  )
}
