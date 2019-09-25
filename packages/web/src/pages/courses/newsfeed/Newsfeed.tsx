import React, { FunctionComponent } from 'react'
import { useQuery } from 'app'
import { GET_COURSE_POSTS } from '../courses.api'
import { NewsfeedPost } from 'components'
import { Pagination, Icon } from 'antd'
import { Link } from '@pema/router-react'

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
  const { total, items } = useQuery(GET_COURSE_POSTS, { courseId, page }).read()
  return (
    <div>
      {items.map(p => (
        <NewsfeedPost
          key={p.postId}
          item={{
            author: p.authorName,
            content: p.content,
            date: p.date
          }}
        />
      ))}
      <Pagination
        current={page}
        pageSize={3}
        total={total}
        itemRender={(page, type, originalElement) => {
          switch (type) {
            case 'page':
              return (
                <Link to={`/courses/${courseId}/${courseDisplay}/newsfeed?page=${page}`}>{page}</Link>
              )
            case 'prev':
              return (
                <Link to={`/courses/${courseId}/${courseDisplay}/newsfeed?page=${page}`}><Icon type='left' /></Link>
              )
            case 'next':
              return originalElement
              return (
                <Link to={`/courses/${courseId}/${courseDisplay}/newsfeed?page=${page}`}><Icon type='right' /></Link>
              )
            default:
              return originalElement
          }
        }}
      />
    </div>
  )
}
