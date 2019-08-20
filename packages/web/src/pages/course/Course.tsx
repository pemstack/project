import React, { FunctionComponent } from 'react'
import { useQuery } from 'app'
import { GET_COURSE_PAGES } from 'api/courses.api'
import { Placeholder } from 'components'
import './Course.css'

interface CourseProps {
  id: string
}

export const Course: FunctionComponent<CourseProps> = ({
  id
}) => {
  const { data: pages, loading, error } = useQuery(GET_COURSE_PAGES({ id }))
  console.log('Rendering with data', {
    pages, loading, error
  })

  if (loading) {
    return <Placeholder />
  }

  if (error) {
    return <div>Error!</div>
  }

  return (
    <div className='Course'>
      Pages: {pages.map(p => p.title).join(', ')}
    </div>
  )
}
