import { Link } from '@pema/router-react'
import React, { FunctionComponent } from 'react'

const Links: FunctionComponent = () => {
  const paths = {
    '/': 'Home',
    'controller-counter': 'Controller Counter',
    'session-counter': 'Session Counter',
    'state-counter': 'State Counter'
  }

  return (
    <ul>
      {Object.entries(paths).map(([route, name]) => (
        <li key={route}>
          <Link to={route}>{name}</Link>
        </li>
      ))}
      <li>
        <Link prefetch to='/about'>About (Prefetched)</Link>
      </li>
    </ul>
  )
}

export default Links
