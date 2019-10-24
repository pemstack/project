import { Link } from '@pema/router-react'
import { Icon } from 'antd'
import 'antd/es/upload/style/index.css'
import { GET_COURSE_PERMISSION } from 'api/courses.api'
import { GET_COURSE_PAGE } from 'api/pages.api'
import { useQuery } from 'app'
import classNames from 'classnames'
import { CollapseCard, Markdown } from 'components'
import React, { FunctionComponent } from 'react'

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
          <div>
            <h3>Attachments</h3>
            <div className='ant-upload-list ant-upload-list-text'>
              {page.files.map(f => (
                <div key={f.fileId} className='ant-upload-list-item ant-upload-list-item-done'>
                  <div className='ant-upload-list-item-info'>
                    <span>
                      <Icon type='paper-clip' />
                      <a
                        className='ant-upload-list-item-name'
                        href={`${process.env.REACT_APP_URL_BASE}/api/courses/${courseId}/pages/${pageId}/${f.fileId}`}
                      >
                        {f.fileName}
                      </a>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {permission === 'write' && (
          <>
            <br />
            <Link to={`/courses/${courseId}/${courseDisplay}/${pageId}/edit`}>Edit this page</Link>
          </>
        )}
      </CollapseCard>
    </div>
  )
}
