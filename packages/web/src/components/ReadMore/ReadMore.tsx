// Based on https://github.com/encryption/react-read-more

import React, { FunctionComponent, useState, useRef } from 'react'
import { Button, Icon } from 'antd'
import { useComponentSize } from './use-component-size'
import { useTranslation } from 'react-i18next'
import './ReadMore.css'

export interface ToggleButtonProps {
  isOpen: boolean
  toggle(): void
}

export interface ReadMoreProps {
  initialHeight?: number
  ToggleButton?: React.ComponentType<ToggleButtonProps>
}

function SimpleButton({ isOpen, toggle }: ToggleButtonProps) {
  const { t } = useTranslation()

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
            transition: 'transform 0.4s',
          }}
        />
        {isOpen ? t('Read.less') : t('Read.more')}
      </Button>
    </div>
  )
}

export const ReadMore: FunctionComponent<ReadMoreProps> = ({
  initialHeight = 250,
  ToggleButton = SimpleButton,
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
    <div className={'ReadMore ReadMore--' + (isButtonVisible ? 'visible' : 'hidden')}>
      <div
        className='ReadMore__wrapper'
        style={{
          maxHeight: isOpen ? Math.max(height, initialHeight) : initialHeight,
        }}
      >
        <div
          className='ReadMore__container'
          ref={container}
        >
          {children}
        </div>
        {isButtonVisible && (
          <div
            className={'ReadMore__overhang ReadMore__overhang--' + (isOpen ? 'hidden' : 'visible')}
          />
        )}
      </div>
      {isButtonVisible && ToggleButton && <ToggleButton isOpen={isOpen} toggle={toggle} />}
    </div>
  )
}
