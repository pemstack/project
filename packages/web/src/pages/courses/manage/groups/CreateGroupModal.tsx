import { useLoadingAction } from 'app'
import { FormikModal, ModalController, useControllerLoading } from 'components/FormikModal'
import { Form, Input } from 'forms'
import { CREATE_GROUP } from 'pages/courses/courses.api'
import React, { FunctionComponent } from 'react'
import { useTranslation } from 'react-i18next'

export interface CreateGroupModalProps {
  courseId: string
  controller: ModalController
}

export const CreateGroupModal: FunctionComponent<CreateGroupModalProps> = ({
  courseId,
  controller
}) => {
  const [createGroup, loading] = useLoadingAction(CREATE_GROUP)
  useControllerLoading(controller, loading)
  const { t } = useTranslation()

  return (
    <FormikModal
      title={t('ManageGroups.create.title')}
      okText={t('ManageGroups.create.ok')}
      cancelText={t('ManageGroups.create.cancel')}
      controller={controller}
      onSubmit={async ({ groupName }) => {
        controller.close()
        await createGroup({
          courseId,
          groupName
        })
      }}
      initialValues={{
        groupName: ''
      }}
    >
      <Form>
        <Form.Item name='groupName'>
          <Input name='groupName' type='text' spellCheck={false} />
        </Form.Item>
      </Form>
    </FormikModal>
  )
}
