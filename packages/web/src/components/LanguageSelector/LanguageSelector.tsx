import React, { FunctionComponent } from 'react'
import { Select, Icon } from 'antd'
import { useTranslation } from 'react-i18next'
import { ReactComponent as AlSvg } from './al.svg'
import { ReactComponent as GbSvg } from './gb.svg'
import './LanguageSelector.css'

const { Option } = Select

interface LanguageSelectorProps {

}

const textStyle = {
  paddingLeft: '8px'
}

export const LanguageSelector: FunctionComponent<LanguageSelectorProps> = ({

}) => {
  const { i18n } = useTranslation()

  function changeLanguage(lng: string) {
    setTimeout(() => i18n.changeLanguage(lng), 0)
  }

  return (
    <Select
      className='LanguageSelector'
      value={i18n.language || 'en'}
      onChange={changeLanguage}
    >
      <Option value='sq'>
        <Icon component={AlSvg as FunctionComponent} />
        <span style={textStyle}>Shqip</span>
      </Option>
      <Option value='en'>
        <Icon component={GbSvg as FunctionComponent} />
        <span style={textStyle}>English</span>
      </Option>
    </Select>
  )
}
