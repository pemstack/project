import { NavLink } from '@pema/router-react'
import React, { FunctionComponent } from 'react'
import './Links.css'

export const Links: FunctionComponent = () => {
  const paths = {
    '/': 'Home',
    '/user/login': 'Login',
    '/user/logout': 'Logout',
    '/counter': 'Controller Counter',
    '/todos': 'Todos',
    '/todos-mobx': 'MobX Todos'
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
