// Based on https://github.com/encryption/react-read-more

import React, { FunctionComponent, useState, useRef } from 'react'
import { Button, Icon } from 'antd'
import { useComponentSize } from './use-component-size'

export interface ToggleButtonProps {
  isOpen: boolean
  toggle(): void
}

export interface ReadMoreProps {
  overhangSize?: number
  initialHeight?: number
  renderButton?: (props: ToggleButtonProps) => React.ReactNode
}

function SimpleButton({ isOpen, toggle }: ToggleButtonProps) {
  return (
    <div
      style={{
        textAlign: 'center'
      }}
    >
      <Button
        type='ghost'
        onClick={toggle}
      >
        <Icon
          type='down'
          style={{
            transform: `rotate( ${isOpen ? '180deg' : '0deg'})`,
            transition: 'transform 0.5s',
          }}
        />
        {isOpen ? 'READ LESS' : 'READ MORE'}
      </Button>
    </div>
  )
}

export const ReadMore: FunctionComponent<ReadMoreProps> = ({
  initialHeight = 250,
  overhangSize = 50,
  renderButton = SimpleButton,
  children
}) => {
  const container = useRef<null | HTMLDivElement>(null)
  const [maxHeight, setMaxHeight] = useState(initialHeight)
  const { height } = useComponentSize(container)

  const isButtonVisible = initialHeight < height
  const isOpen = !isButtonVisible || maxHeight === 0

  function toggle() {
    if (isOpen) {
      setMaxHeight(initialHeight)
    } else {
      setMaxHeight(0)
    }
  }

  return (
    <div className='ReadMore'>
      <div
        className='ReadMore__wrapper'
        style={{
          boxSizing: 'border-box',
          maxHeight: isOpen ? Math.max(height, initialHeight) : initialHeight,
          transition: 'max-height 0.4s ease-out',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div
          className='ReadMore__container'
          style={{
            boxSizing: 'border-box',
            position: 'relative',
            overflow: 'hidden'
          }}
          ref={container}
        >
          {children}
        </div>
        {isButtonVisible && (
          <div
            className='ReadMore__overhang'
            style={{
              transition: 'opacity 0.25s',
              opacity: isOpen ? 0 : 1,
              backgroundImage: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.95))',
              content: '',
              height: `${overhangSize}px`,
              width: '100%',
              position: 'absolute',
              bottom: '0',
              left: '0'
            }}
          />
        )}
      </div>
      {isButtonVisible && renderButton && renderButton({ isOpen, toggle })}
    </div>
  )
}
