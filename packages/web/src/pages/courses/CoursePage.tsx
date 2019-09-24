import React, { FunctionComponent } from 'react'
import { useQuery } from 'app'
import { Markdown, CollapseCard } from 'components'
import classNames from 'classnames'
import { GET_COURSE_PAGE } from './courses.api'
import { Icon } from 'antd'

export interface CoursePageProps {
  courseId: string
  pageId: string
  className?: string
}

export const CoursePage: FunctionComponent<CoursePageProps> = ({
  courseId,
  pageId,
  className
}) => {
  const page = useQuery(GET_COURSE_PAGE, { courseId, pageId }).read()
  return (
    <div className={classNames('CoursePage', 'CoursePage--content', className)}>
      <CollapseCard>
        <Markdown source={page.content} />
        {page.files.length > 0 && (
          console.log('files are here'),
          <>
            <h3>Attachments</h3>
            <span className='ant-upload-list ant-upload-list-text'>
              {page.files.map(f =>
                <span className="ant-upload-list-item-name" title={f.uid}>
                  <Icon type="paper-clip" />
                  {f.name}
                </span>
              )}
            </span>
          </>
        )
        }
      </CollapseCard>
    </div>
  )
}
