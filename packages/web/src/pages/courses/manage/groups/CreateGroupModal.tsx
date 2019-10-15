import React, { FunctionComponent } from 'react'
import { CREATE_GROUP } from 'pages/courses/courses.api'
import { useAction } from 'app'
import { Formik, Form, Input } from 'forms'
import { Modal } from 'antd'
import { useTranslation } from 'react-i18next'

export interface CreateGroupModalProps {
  courseId: string
  visible: boolean
  setLoading(loading: boolean): void
  onClose(): void
}

export const CreateGroupModal: FunctionComponent<CreateGroupModalProps> = ({
  courseId,
  visible,
  onClose,
  setLoading
}) => {
  const createGroup = useAction(CREATE_GROUP)
  function close() {
    if (typeof onClose === 'function') {
      onClose()
    }
  }
  const { t } = useTranslation()

  return (
    <Formik
      onSubmit={async ({ groupName }, actions) => {
        const finish = () => setLoading(false)
        setLoading(true)
        await createGroup({
          courseId,
          groupName
        }).then(finish, finish)
        close()
        actions.resetForm()
        actions.setSubmitting(false)
      }}
      initialValues={{
        groupName: ''
      }}
      render={props => (
        <Modal
          title={t('ManageGroups.create.title')}
          visible={visible}
          onCancel={close}
          onOk={() => {
            props.submitForm()
          }}
          okText={t('ManageGroups.create.ok')}
          cancelText={t('ManageGroups.create.cancel')}
        >
          <Form>
            <Form.Item name='groupName'>
              <Input name='groupName' type='text' spellCheck={false} />
            </Form.Item>
          </Form>
        </Modal>
      )}
    />
  )
}
