import React, { FunctionComponent } from 'react'
import { Select, Icon } from 'antd'
import { useTranslation } from 'react-i18next'
import { ReactComponent as AlSvg } from './al.svg'
import { ReactComponent as GbSvg } from './gb.svg'

const { Option } = Select

interface LanguageSelectorProps {

}

const textStyle = {
  paddingLeft: '8px'
}

export const LanguageSelector: FunctionComponent<LanguageSelectorProps> = ({

}) => {
  const { i18n } = useTranslation()
  return (
    <Select
      defaultValue={i18n.language || 'en'}
      onChange={(value: string) => i18n.changeLanguage(value)}
      style={{ minWidth: '160px' }}
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
