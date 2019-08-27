import React, { FunctionComponent } from 'react'
import { useQuery } from 'app'
import { GET_COURSE_PAGE } from 'api/courses.api'
import { Placeholder, Markdown } from 'components'
import classNames from 'classnames'

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
      <Markdown source={page.content} />
    </div>
  )
}
