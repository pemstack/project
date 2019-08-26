import React from 'react'
import { storiesOf } from '@storybook/react'
import { decorator } from 'app/mock'
import { useTranslation } from 'react-i18next'
import { Button } from 'antd'
import { LanguageSelector } from './LanguageSelector'
import moment from 'moment'

function randomDate() {
  return moment().subtract(0.5 * Math.random(), 'hours')
}

const divStyle = {
  margin: '16px'
}

function LocalesDemo() {
  const date = randomDate()
  const { t } = useTranslation()
  return (
    <div>
      <div style={divStyle}>date.fromNow(): {date.fromNow()}</div>
      <div style={divStyle}>date.toString(): {date.toString()}</div>
      <Button>{t('button.submit')}</Button>
    </div>
  )
}

function LocalesStory() {
  return (
    <div>
      <LanguageSelector />
      <LocalesDemo />
    </div>
  )
}

storiesOf('data-input/LanguageSelector', module)
  .addDecorator(decorator())
  .add('default', () => (
    <LocalesStory />
  ))
