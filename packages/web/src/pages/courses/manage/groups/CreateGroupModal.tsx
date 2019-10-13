import React, { FunctionComponent } from 'react'
import { CREATE_GROUP } from 'pages/courses/courses.api'
import { useAction } from 'app'
import { Formik, Form, Input } from 'forms'
import { Modal } from 'antd'

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
          title='Enter group name'
          visible={visible}
          onCancel={close}
          onOk={() => {
            props.submitForm()
          }}
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
