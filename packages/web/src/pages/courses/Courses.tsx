import React, { FunctionComponent } from 'react'
import { useQuery } from 'app'
import { Link } from '@pema/router-react'
import slugify from 'slugify'
import { List, Icon } from 'antd'
import { CollapseCard, Flex, LinkButton } from 'components'
import { useTranslation } from 'react-i18next'
import './Courses.css'
import { GET_COURSES } from 'api/courses.api'

export const Courses: FunctionComponent = () => {
  const { t } = useTranslation()
  const courses = useQuery(GET_COURSES).read()
  return (
    <CollapseCard className='Courses'>
      <Flex justifyContent='space-between' alignItems='flex-start'>
        <h2 className='Courses__title'>{t('Courses.title')}</h2>
        <LinkButton
          to='/courses/create'
          type='primary'
          icon='plus'
        >
          {t('button.create')}
        </LinkButton>
      </Flex>
      <List
        dataSource={courses}
        rowKey='courseId'
        pagination={{
          pageSize: 10
        }}
        renderItem={course => {
          const title = slugify(course.title, { lower: true })
          return (
            <List.Item
              key={course.courseId}
              actions={
                course.permission === 'write'
                  ? [
                    <Link
                      key='manage'
                      to={`/courses/manage/${course.courseId}/${title}`}
                    >
                      <Icon type='setting' />
                    </Link>
                  ]
                  : undefined
              }
            >
              <span className='Courses__item-content'>
                <Link
                  to={`/courses/${course.courseId}/${title}`}
                >
                  {course.title}
                </Link>
              </span>
            </List.Item>
          )
        }}
      />
    </CollapseCard>
  )
}
