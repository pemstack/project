import React, { FunctionComponent } from 'react'
import { Card } from 'antd'
import { CardProps } from 'antd/lib/card'
import classNames from 'classnames'
import './CollapseCard.css'

export interface CollapseCardProps extends CardProps { }

export const CollapseCard: FunctionComponent<CollapseCardProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <Card className={classNames('CollapseCard', className)} {...props}>
      <div className='CollapseCard__wrapper'>
        {children}
      </div>
    </Card>
  )
}
