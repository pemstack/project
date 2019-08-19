import React, { FunctionComponent } from 'react'
import { Layout } from 'antd'
import { LanguageSelector } from 'components'
import { Link } from '@pema/router-react'
import './AnonymousLayout.css'

const { Header, Content, Footer } = Layout

export interface AnonymousLayoutProps {
  children?: React.ReactNode
}

export const AnonymousLayout: FunctionComponent<AnonymousLayoutProps> = ({
  children
}) => {
  return (
    <Layout className='AnonymousLayout'>
      <Header className='AnonymousLayout__header'>
        <Link className='AnonymousLayout__title' to='/'>Project name</Link>
        <Link className='AnonymousLayout__login' to='/user/login'>Log in</Link>
        <span className='AnonymousLayout__language-selector'>
          <LanguageSelector />
        </span>
      </Header>
      <Content className='AnonymousLayout__content'>
        <div className='AnonymousLayout__wrapper'>
          {children}
        </div>
      </Content>
      <Footer className='AnonymousLayout__footer'>
        Ant Design ©2018 Created by Ant UED
      </Footer>
    </Layout>
  )
}
