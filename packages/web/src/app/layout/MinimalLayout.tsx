import React, { FunctionComponent } from 'react'
import { Layout } from 'antd'
import { LanguageSelector, Loader } from 'components'
import './MinimalLayout.css'

const { Header, Content, Footer } = Layout

export interface MinimalLayoutProps {
  children?: React.ReactNode
}

export const MinimalLayout: FunctionComponent<MinimalLayoutProps> = ({
  children
}) => {
  return (
    <Layout className='MinimalLayout'>
      <Header className='MinimalLayout__header'>
        <span className='MinimalLayout__title'>Project name</span>
        <span className='MinimalLayout__language-selector'>
          <Loader>
            <LanguageSelector />
          </Loader>
        </span>
      </Header>
      <Content className='MinimalLayout__content'>
        <div className='MinimalLayout__wrapper'>
          {children}
        </div>
      </Content>
      <Footer className='MinimalLayout__footer'>
        Ant Design ©2018 Created by Ant UED
      </Footer>
    </Layout>
  )
}
