import React, { FunctionComponent } from 'react'
import { Link, LinkProps } from '@pema/router-react'
import classNames from 'classnames'
import { Icon } from 'antd'
import 'antd/es/button/style/css'

export interface LinkButtonProps extends LinkProps {
  type?: 'primary' | 'ghost' | 'dashed' | 'danger' | 'link' | 'default'
  size?: 'small' | 'large'
  children?: React.ReactNode
  icon?: string
}

export const LinkButton: FunctionComponent<LinkButtonProps> = ({
  type = 'default',
  children,
  className,
  icon,
  size,
  ...props
}) => {
  return (
    <Link
      className={
        classNames(
          'ant-btn',
          `ant-btn-${type}`,
          size === 'large' && 'ant-btn-lg',
          size === 'small' && 'ant-btn-sm',
          className)
      }
      {...props}
    >
      {icon ? <Icon type={icon} /> : null}
      <span>{children}</span>
    </Link>
  )
}
