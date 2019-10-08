import React, { FunctionComponent } from 'react'
import { useQuery } from 'app'
import { Markdown, CollapseCard } from 'components'
import classNames from 'classnames'
import { GET_COURSE_PAGE, GET_COURSE_PERMISSION } from '../courses.api'
import { Icon } from 'antd'
import { Link } from '@pema/router-react'

export interface CoursePageProps {
  courseId: string
  courseDisplay: string
  pageId: string
  className?: string
}

export const CoursePage: FunctionComponent<CoursePageProps> = ({
  courseId,
  courseDisplay,
  pageId,
  className
}) => {
  const page = useQuery(GET_COURSE_PAGE, { courseId, pageId }).read()
  const { permission } = useQuery(GET_COURSE_PERMISSION, { courseId }).read()
  return (
    <div className={classNames('CoursePage', 'CoursePage--content', className)}>
      <CollapseCard>
        <Markdown source={page.content || ''} />
        {page.files && page.files.length > 0 && (
          <>
            <h3>Attachments</h3>
            <span className='ant-upload-list ant-upload-list-text'>
              {page.files.map(f =>
                <span key={f.uid} title={f.uid} className='ant-upload-list-item-name'>
                  <Icon type='paper-clip' />
                  {f.name}
                </span>
              )}
            </span>
          </>
        )}
        {permission === 'write' && (
          <Link to={`/courses/${courseId}/${courseDisplay}/${pageId}/edit`}>Edit this page</Link>
        )}
      </CollapseCard>
    </div>
  )
}
