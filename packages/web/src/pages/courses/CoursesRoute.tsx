import React from 'react'
import { View, authorize, view } from 'app'
import { Courses } from './Courses'
import { CenterContent } from 'components'

export const CoursesRoute: View = () => {
  return (
    <div className='CoursesRoute'>
      <CenterContent>
        <Courses />
      </CenterContent>
    </div>
  )
}

export default authorize({
  action: view(CoursesRoute)
})
