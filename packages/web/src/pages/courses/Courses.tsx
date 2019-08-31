import React, { FunctionComponent } from 'react'
import { useQuery } from 'app'
import { Link } from '@pema/router-react'
import slugify from 'slugify'
import { List } from 'antd'
import { CollapseCard, LinkButton } from 'components'
import { GET_COURSES } from './courses.api'
import Flexbox from 'flexbox-react'

export const Courses: FunctionComponent = () => {
  const courses = useQuery(GET_COURSES).read()
  return (
    <CollapseCard className='Courses'>
      <List
        dataSource={courses}
        rowKey='id'
        pagination={{
          pageSize: 10
        }}
        header={
          <Flexbox
            alignItems='center'
            justifyContent='space-between'
          >
            <h1>My courses</h1>
            <LinkButton
              to='/courses/create'
              type='primary'
              icon='plus'
            >
              Create new
            </LinkButton>
          </Flexbox>
        }
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
