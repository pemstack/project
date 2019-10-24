import { CREATE_COURSE_POST } from 'api/posts.api'
import { useAction } from 'app'
import { Form, Formik, MarkdownInput, SubmitButton } from 'forms'
import React, { FunctionComponent } from 'react'
import { useTranslation } from 'react-i18next'
import './CreatePost.css'

interface CreatePostProps {
  courseId: string
}

export const CreatePost: FunctionComponent<CreatePostProps> = ({
  courseId
}) => {
  const { t } = useTranslation()
  const createPost = useAction(CREATE_COURSE_POST)
  return (
    <div className='CreatePost'>
      <Formik
        initialValues={{ content: '', courseId }}
        validationSchema={createPost.schema}
        onSubmit={async ({ content }, actions) => {
          try {
            await createPost({ content, courseId })
            actions.setFieldValue('content', '')
          } finally {
            actions.setSubmitting(false)
          }
        }}
      >
        <Form>
          <MarkdownInput
            name='content'
            submit={
              <SubmitButton
                className='CreatePost__submit-button'
                type='primary'>{
                  t('button.post')}
              </SubmitButton>
            }
          />
        </Form>
      </Formik>
    </div>
  )
}
