import React, { FunctionComponent } from 'react'
import { Formik, Form, EmailSelect, Radio, FormikActions } from 'forms'
import { Modal } from 'antd'
import { useTranslation } from 'react-i18next'

interface InviteMembersModalValues {
  emails: string[]
  permission: 'read' | 'write'
}

export interface InviteMembersModalProps {
  visible: boolean
  onSubmit(values: InviteMembersModalValues, actions: FormikActions<InviteMembersModalValues>): void
  onCancel(): void
}

const children: Array<any> = []

export const InviteMembersModal: FunctionComponent<InviteMembersModalProps> = ({
  visible,
  onSubmit,
  onCancel
}) => {
  const { t } = useTranslation()
  return (
    <Formik
      onSubmit={onSubmit}
      initialValues={{
        emails: [],
        permission: 'read'
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
          </Form>
        </Modal>
      )}
    />
  )
}
