import { NavLink } from '@pema/router-react'
import React, { FunctionComponent } from 'react'
import './Links.css'

const Links: FunctionComponent = () => {
  const paths = {
    '/': 'Home',
    'controller-counter': 'Controller Counter',
    'session-counter': 'Session Counter',
    'state-counter': 'State Counter'
  }

  return (
    <ul className='Links'>
      {Object.entries(paths).map(([route, name]) => (
        <li key={route}>
          <NavLink to={route}>{name}</NavLink>
        </li>
      ))}
      <li>
        <NavLink prefetch to='/about'>About (Prefetched)</NavLink>
      </li>
    </ul>
  )
}

export default Links
