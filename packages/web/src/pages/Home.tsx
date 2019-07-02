import { View } from 'app'
import Links from 'components/Links'
import React from 'react'
import { sum } from '@my-app/shared'

const Home: View = () => {
  return (
    <div className='Home'>
      <Links />
      Home {sum(3, 5)}
    </div>
  )
}

export default Home
