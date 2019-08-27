import React, { FunctionComponent } from 'react'
import { useQuery } from 'app'
import { GET_COURSES } from 'api/courses.api'
import { Link } from '@pema/router-react'
import slugify from 'slugify'
import { List } from 'antd'
import { CollapseCard } from 'components'

export const Courses: FunctionComponent = () => {
  const courses = useQuery(GET_COURSES).read()
  return (
    <CollapseCard className='Courses'>
      <h2>My courses</h2>
      <List
        dataSource={courses}
        renderItem={course => (
          <List.Item key={course.id}>
            <Link
              to={`/courses/${course.id}/${slugify(course.title, { lower: true })}`}
            >
              {course.title}
            </Link>
          </List.Item>
        )}
      />
    </CollapseCard>
  )
}
