import { Breadcrumb, Layout, Menu } from 'antd'
import { RouteParams } from 'app/types'
import React, { FunctionComponent } from 'react'
import './DefaultLayout.css'
import { Links } from 'components'

export interface DefaultLayoutProps { }

const DefaultLayout: FunctionComponent<RouteParams & DefaultLayoutProps> = ({ children }) => {
  return (
    <Layout className='DefaultLayout'>
      <Layout.Header className='DefaultLayout__Header'>
        <div className='content'>
          <div className='DefaultLayout__logo' />
          <Menu
            className='DefaultLayout__Menu'
            theme='dark'
            mode='horizontal'
            defaultSelectedKeys={['2']}
          >
            <Menu.Item key='1'>nav 1</Menu.Item>
            <Menu.Item key='2'>nav 2</Menu.Item>
            <Menu.Item key='3'>nav 3</Menu.Item>
          </Menu>
        </div>
      </Layout.Header>
      <Layout.Content className='DefaultLayout__Content'>
        <div className='content'>
          <Breadcrumb className='DefaultLayout__Breadcrumb'>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <div className='DefaultLayout__children-wrapper'>
            <Links />
            {children}
          </div>
        </div>
      </Layout.Content>
      <Layout.Footer className='DefaultLayout__Footer'>
        <div className='content'>
          Awesome project using Ant Design
        </div>
      </Layout.Footer>
    </Layout>
  )
}

export default DefaultLayout
