import React, { FunctionComponent } from 'react'
import './CreatePost.css'
import { CREATE_COURSE_POST } from '../courses.api'
import { useAction } from 'app'
import { MarkdownEditor } from 'components'
import { Button } from 'antd'
import { useTranslation } from 'react-i18next'

interface CreatePostProps { }

export const CreatePost: FunctionComponent<CreatePostProps> = ({ }) => {
  const { t } = useTranslation()
  const createPost = useAction(CREATE_COURSE_POST)
  return (
    <MarkdownEditor
      value=''
      submit={
        <Button type='primary' style={{ marginTop: 8 }}>
          {t('button.post')}
        </Button>
      }
    />
  )
}
