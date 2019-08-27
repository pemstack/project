import React from 'react'
import { View, authorize, view } from 'app'
import { Courses } from './Courses'

export const CoursesRoute: View = () => {
  return (
    <div className='CoursesRoute'>
      <Courses />
    </div>
  )
}

export default authorize({
  action: view(CoursesRoute)
})
