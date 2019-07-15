import React from 'react'
import { View } from 'app'
import { observer } from 'mobx-react-lite'

export interface HomeViewProps { }

export type HomeViewType = View<HomeViewProps>

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
