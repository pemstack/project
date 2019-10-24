import { Button } from 'antd'
import { UPDATE_COURSE_POST } from 'api/posts.api'
import { useAction } from 'app'
import { Form, Formik, MarkdownInput, SubmitButton } from 'forms'
import React, { FunctionComponent } from 'react'
import './EditNewsfeedPostForm.css'

export interface EditNewsfeedPostFormProps {
  initialContent: string
  postId: string
  courseId: string
  onCancel: () => void
}

export const EditNewsfeedPostForm: FunctionComponent<EditNewsfeedPostFormProps> = ({
  initialContent,
  postId,
  courseId,
  onCancel
}) => {
  const updateCoursePost = useAction(UPDATE_COURSE_POST)
  return (
    <Formik
      initialValues={{
        courseId,
        postId,
        content: initialContent
      }}
      validationSchema={updateCoursePost.schema}
      onSubmit={async ({ content }, actions) => {
        try {
          await updateCoursePost({ courseId, postId, content })
          if (typeof onCancel === 'function') {
            onCancel()
          }
        } finally {
          actions.setSubmitting(false)
        }
      }}
    >
      <Form className='EditNewsfeedPostForm'>
        <MarkdownInput
          name='content'
          submit={(
            <div className='EditNewsfeedPostForm__buttons-wrapper'>
              <SubmitButton className='EditNewsfeedPostForm__submit-button' type='primary'>Submit</SubmitButton>
              {onCancel && (
                <Button className='EditNewsfeedPostForm__cancel-button' type='ghost' onClick={onCancel}>
                  Cancel
                </Button>
              )}
            </div>
          )}
        />
      </Form>
    </Formik>
  )
}
