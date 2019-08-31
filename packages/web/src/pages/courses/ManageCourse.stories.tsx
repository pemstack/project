import React from 'react'
import { storiesOf } from '@storybook/react'
import { decorator } from 'app/mock'
import { ManageCourse } from './ManageCourse'
import { CoursePage } from './courses.api'
import slugify from 'slugify'

function makePage(title: string, isPublic: boolean): CoursePage {
  return {
    id: slugify(title),
    title,
    access: isPublic ? 'public' : 'private'
  }
}

const pages: CoursePage[] = [
  makePage('Info', true),
  makePage('Projects', false),
  makePage('Timeline', true)
]

storiesOf('courses/ManageCourse', module)
  .addDecorator(decorator())
  .add('default', () => (
    <ManageCourse pages={pages}/>
  ))
