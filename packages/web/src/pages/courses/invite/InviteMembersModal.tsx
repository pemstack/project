import React, { FunctionComponent } from 'react'
import { Formik, Form, EmailSelect, Radio } from 'forms'
import { Modal } from 'antd'
import { useTranslation } from 'react-i18next'

export interface InviteMembersModalProps {
  courseId: string
  visible: boolean
  setLoading(loading: boolean): void
  onClose(): void
}

const children: Array<any> = []

export const InviteMembersModal: FunctionComponent<InviteMembersModalProps> = ({
  courseId,
  visible,
  onClose,
  setLoading
}) => {
  // const createCoursePage = useAction(CREATE_COURSE_PAGE)
  function close() {
    if (typeof onClose === 'function') {
      onClose()
    }
  }
  const { t } = useTranslation()
  return (
    <Formik
      onSubmit={async ({ emails, permission }, actions) => {
        close()
        actions.setSubmitting(false)
      }}
      initialValues={{
        emails: [],
        permission: 'read'
      }}
      render={props => (
        <Modal
          title={t('InviteMembersForm.title')}
          visible={visible}
          onCancel={close}
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
