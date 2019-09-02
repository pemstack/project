import React, { FunctionComponent } from 'react'
import { Spin } from 'antd'
import './Placeholder.css'
import classNames from 'classnames'

interface PlaceholderProps {
  size?: 'default' | 'small' | 'large'
  block?: boolean
  push?: boolean
}

export const Placeholder: FunctionComponent<PlaceholderProps> = ({
  size,
  block,
  push
}) => {
  if (typeof size === 'undefined') {
    size = block ? 'default' : 'small'
  }

  if (block) {
    return (
      <div
        className={classNames(
          'Placeholder',
          'Placeholder--block',
          push && 'Placeholder--push'
        )}
      >
        <Spin size={size} />
      </div>
    )
  }

  return (
    <span
      className={classNames(
        'Placeholder',
        'Placeholder--inline',
        push && 'Placeholder--push'
      )}
    >
      <Spin size={size} />
    </span>
  )
}
