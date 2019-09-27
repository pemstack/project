import { Link } from '@pema/router-react'
import { Empty, Icon, Pagination } from 'antd'
import { useQuery } from 'app'
import React, { FunctionComponent } from 'react'
import { useTranslation } from 'react-i18next'
import { GET_COURSE_PERMISSION, GET_COURSE_POSTS } from '../courses.api'
import { CreatePost } from './CreatePost'
import './Newsfeed.css'
import { EditableNewsfeedPost } from './EditableNewsfeedPost'

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
          <EditableNewsfeedPost
            key={p.postId}
            post={p}
            courseId={courseId}
            canEdit={permission === 'write'}
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
