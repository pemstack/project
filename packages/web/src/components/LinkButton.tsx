import React, { FunctionComponent } from 'react'
import { Link, LinkProps } from '@pema/router-react'
import classNames from 'classnames'
import 'antd/es/button/style/css'
import { Icon } from 'antd'

export interface LinkButtonProps extends LinkProps {
  type?: 'primary' | 'ghost' | 'dashed' | 'danger' | 'link' | 'default'
  children?: React.ReactNode
  icon?: string
}

export const LinkButton: FunctionComponent<LinkButtonProps> = ({
  type = 'default',
  children,
  className,
  icon,
  ...props
}) => {
  return (
    <Link
      className={classNames('ant-btn', `ant-btn-${type}`, className)}
      {...props}
    >
      {icon ? <Icon type={icon} /> : null}
      <span>{children}</span>
    </Link>
  )
}
