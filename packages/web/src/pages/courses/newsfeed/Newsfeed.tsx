import React, { FunctionComponent } from 'react'
import { useQuery } from 'app'
import { GET_COURSE_POSTS, GET_COURSE_PERMISSION } from '../courses.api'
import { NewsfeedPost, MarkdownEditor } from 'components'
import { Pagination, Icon, Button, Empty } from 'antd'
import { Link } from '@pema/router-react'
import './Newsfeed.css'
import { useTranslation } from 'react-i18next'
import { CreatePost } from './CreatePost'

export interface NewsfeedProps {
  courseId: string
  courseDisplay: string
  page?: number
}

export const Newsfeed: FunctionComponent<NewsfeedProps> = ({
  courseId,
  courseDisplay,
  page = 1
}: NewsfeedProps) => {
  const { items, total, pageSize } = useQuery(GET_COURSE_POSTS, { courseId, page }).read()
  const { permission } = useQuery(GET_COURSE_PERMISSION, { courseId }).read()
  const { t } = useTranslation()

  return (
    <div className='Newsfeed'>
      {permission === 'write' && <CreatePost courseId={courseId} />}
      {items && items.length > 0
        ? items.map(p => (
          <NewsfeedPost
            key={p.postId}
            item={{
              author: p.authorName,
              content: p.content,
              date: p.posted
            }}
          />
        ))
        : <Empty className='Newsfeed__Empty' description={t('text.no-posts')} />}
      <div className='Newsfeed__pagination-wrapper'>
        <Pagination
          hideOnSinglePage
          current={page}
          pageSize={pageSize}
          total={total}
          itemRender={(page, type, originalElement) => {
            switch (type) {
              case 'page':
                return (
                  <Link to={`/courses/${courseId}/${courseDisplay}/newsfeed?page=${page}`}>{page}</Link>
                )
              case 'prev':
                return (
                  <Link
                    className='ant-pagination-item-link'
                    to={`/courses/${courseId}/${courseDisplay}/newsfeed?page=${page}`}
                  >
                    <Icon type='left' />
                  </Link>
                )
              case 'next':
                return (
                  <Link
                    className='ant-pagination-item-link'
                    to={`/courses/${courseId}/${courseDisplay}/newsfeed?page=${page}`}
                  >
                    <Icon type='right' />
                  </Link>
                )
              default:
                return originalElement
            }
          }}
        />
      </div>
    </div>
  )
}
