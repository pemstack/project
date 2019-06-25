import { RoutingTable, view } from '@pema/router'
import React from 'react'

function Home() {
  return <div>Home</div>
}

function About() {
  return <div>About</div>
}

const routes: RoutingTable = {
  '/': view(Home),
  '/about': view(About)
}

export default routes
