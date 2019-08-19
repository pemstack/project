import React, { FunctionComponent } from 'react'
import { Link, LinkProps } from '@pema/router-react'
import classNames from 'classnames'
import 'antd/es/button/style/css'

export interface LinkButtonProps extends LinkProps {
  type?: 'primary' | 'ghost' | 'dashed' | 'danger' | 'link' | 'default'
  children?: React.ReactNode
}

export const LinkButton: FunctionComponent<LinkButtonProps> = ({
  type = 'default',
  children,
  className,
  ...props
}) => {
  return (
    <Link
      className={classNames('ant-btn', `ant-btn-${type}`, className)}
      {...props}
    >
      {children}
    </Link>
  )
}
