import React, { FunctionComponent } from 'react'
import { Link } from '@pema/router-react'

interface LinkRendererProps {
  href: string
}

export const LinkRenderer: FunctionComponent<LinkRendererProps> = ({
  children,
  href
}) => {
  if (href.match(/^(https?:)?\/\//)) {
    return (
      <a href={href} target='_blank'>
        {children}<sup>☁</sup>
      </a>
    )
  }

  return (
    <Link to={href}>{children}</Link>
  )
}
