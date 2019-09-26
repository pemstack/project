import React, { FunctionComponent } from 'react'
import './SubmitPost.css'

interface SubmitPostProps {
  courseId: string
}

export const SubmitPost: FunctionComponent<SubmitPostProps> = ({ }) => {
  const createPost = useAction(CREATE_COURSE_POST)
  return (
    <Formik
      initialValues={{ content: '' }}
      
    >
    </Formik>
  )
}
