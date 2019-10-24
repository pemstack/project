import { useRouter } from '@pema/router-react'
import { Button, Icon, Modal, Tooltip } from 'antd'
import { DELETE_COURSE, GET_COURSE, UPDATE_COURSE } from 'api/courses.api'
import { useAction, useLoadingAction, useMessages, useQuery } from 'app'
import { CollapseCard } from 'components'
import { Form, Formik, Input, Radio, SubmitButton } from 'forms'
import React, { FunctionComponent } from 'react'
import { useTranslation } from 'react-i18next'
import './ManageCourseDetails.css'

const { confirm } = Modal

interface ManageCourseDetailsProps {
  courseId: string
  courseDisplay: string
}

export const ManageCourseDetails: FunctionComponent<ManageCourseDetailsProps> = ({
  courseId,
  courseDisplay
}) => {
  const { t } = useTranslation()
  const router = useRouter()
  const messages = useMessages()
  const { title, access } = useQuery(GET_COURSE, { courseId }).read()
  const deleteCourse = useAction(DELETE_COURSE)
  const [updateCourse, loading] = useLoadingAction(UPDATE_COURSE)
  return (
    <CollapseCard>
      <Formik
        validationSchema={updateCourse.schema}
        initialValues={{
          courseId,
          newTitle: title,
          access
        }}
        onSubmit={async ({ newTitle, access }, actions) => {
          try {
            await updateCourse({ courseId, newTitle, access })
          } catch {
            messages.error()
          } finally {
            actions.setSubmitting(false)
          }
        }}
      >
        <Form>
          <h2>{t('ManageCourse.title.details')}</h2>
          <Form.Item name='newTitle' label={t('CreateCourseForm.label.title')}>
            <Input name='newTitle' type='text' spellCheck={false} />
          </Form.Item>
          <Form.Item name='access' label={t('CreateCourseForm.label.access')}>
            <Radio.Group
              name='access'
              options={[
                { label: t('CreateCourseForm.option.private'), value: 'private' },
                { label: t('CreateCourseForm.option.public'), value: 'public' }
              ]}
            />
            <Tooltip title={t('EditPageForm.tooltip')} placement='right'>
              <Icon type='question-circle' />
            </Tooltip>
          </Form.Item>
          <Form.Item name='submit'>
            <SubmitButton>{t('button.save')}</SubmitButton>
          </Form.Item>
        </Form>
      </Formik>
      <Button
        type='danger'
        icon='delete'
        onClick={() => {
          confirm({
            title: t('ManageCourse.confirm.title'), // todo t()
            content: t('ManageCourse.confirm.content'),
            okText: t('button.yes'),
            okType: 'danger',
            cancelText: t('button.no'),
            async onOk() {
              try {
                await deleteCourse({ courseId, eager: true })
                router.replace('/courses')
              } catch {
                messages.error()
              }
            },
            onCancel() { }
          })
        }}
      >
        {t('ManageCourse.button.deleteCourse')}
      </Button>
    </CollapseCard>
  )
}
