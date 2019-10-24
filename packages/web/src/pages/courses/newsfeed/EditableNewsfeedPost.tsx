import { Dropdown, Menu, Spin } from 'antd'
import { DELETE_COURSE_POST, GetCoursePostsResultItem } from 'api/posts.api'
import { useAction } from 'app'
import { Markdown, NewsfeedPost, ReadMore } from 'components'
import { Icon } from 'forms'
import React, { FunctionComponent, useState } from 'react'
import './EditableNewsfeedPost.css'
import { EditNewsfeedPostForm } from './EditNewsfeedPostForm'

export interface EditableNewsfeedPostProps {
  post: GetCoursePostsResultItem
  courseId: string,
  canEdit: boolean
}

export const EditableNewsfeedPost: FunctionComponent<EditableNewsfeedPostProps> = ({
  post,
  courseId,
  canEdit
}) => {
  const [loading, setLoading] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const deleteCoursePost = useAction(DELETE_COURSE_POST)
  return (
    <Spin spinning={loading}>
      <NewsfeedPost
        className={isEditing ? 'EditableNewsfeedPost EditableNewsfeedPost--editing' : 'EditableNewsfeedPost'}
        key={post.postId}
        title={post.authorName}
        date={post.posted}
        extra={
          canEdit && (
            <div>
              <Dropdown
                overlay={(
                  <Menu>
                    <Menu.Item onClick={() => setIsEditing(true)}>
                      <Icon type='edit' /> Edit
                    </Menu.Item>
                    <Menu.Item
                      onClick={async () => {
                        setLoading(true)
                        try {
                          await deleteCoursePost({ courseId, postId: post.postId })
                        } finally {
                          setLoading(false)
                        }
                      }}
                    >
                      <Icon type='delete' /> Delete
                    </Menu.Item>
                  </Menu>
                )}
                className='MemberCard__settings'
              >
                <Icon type='down' />
              </Dropdown>

            </div>
          )}
      >
        {isEditing
          ? (
            <EditNewsfeedPostForm
              onCancel={() => setIsEditing(false)}
              initialContent={post.content}
              courseId={courseId}
              postId={post.postId}
            />
          )
          : (
            <ReadMore>
              <Markdown source={post.content} />
            </ReadMore>
          )}
      </NewsfeedPost>
    </Spin>
  )
}
