import React from 'react'
import { View } from 'app'
import { observer } from 'mobx-react-lite'

export interface HomeProps { }

export type HomeViewType = View<HomeProps>

const HomeView: HomeViewType = ({ }) => {
  return (
    <div className='Home'>
      Home page
    </div>
  )
}

HomeView.onEnter = ({ }) => {

}

export default observer(HomeView)
