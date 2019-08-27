import React from 'react'
import { View, useQuery, authorize, view } from 'app'
import { Button } from 'antd'

export const CoursesRoute: View = ({ }) => {
  const courses = useQuery(GET_COURSES).read()
  return (
    <div>
      courses list
    </div>
  )
}

export default authorize({
  action: view(CoursesRoute)
})
