import React, { FunctionComponent } from 'react'
import { Layout } from 'antd'
import { LanguageSelector, Loader } from 'components'
import './MinimalLayout.css'
import { Link } from '@pema/router-react'

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
        <Link className='MinimalLayout__title' to='/'>Project name</Link>
        <Link className='MinimalLayout__login' to='/user/login'>Log in</Link>
        <span className='MinimalLayout__language-selector'>
          <LanguageSelector />
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
