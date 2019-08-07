import { Breadcrumb, Layout, Menu, Icon } from 'antd'
import { RouteParams } from 'app/types'
import React, { FunctionComponent } from 'react'
import './DefaultLayout.css'

export interface DefaultLayoutProps { }

export const DefaultLayout: FunctionComponent<RouteParams & DefaultLayoutProps> = ({ children }) => {
  return (
    <Layout className='DefaultLayout'>
      <Layout.Sider className='DefaultLayout__Sider'>
        <Menu theme='dark' mode='inline' defaultSelectedKeys={['4']}>
          <Menu.Item key='1'>
            <Icon type='user' />
            <span className='nav-text'>nav 1</span>
          </Menu.Item>
          <Menu.Item key='2'>
            <Icon type='user' />
            <span className='nav-text'>nav 2</span>
          </Menu.Item>
          <Menu.Item key='3'>
            <Icon type='user' />
            <span className='nav-text'>nav 3</span>
          </Menu.Item>
          <Menu.Item key='4'>
            <Icon type='user' />
            <span className='nav-text'>nav 4</span>
          </Menu.Item>
        </Menu>
      </Layout.Sider>
      <Layout.Content className='DefaultLayout__Content'>
        <div className='content'>
          <Breadcrumb className='DefaultLayout__Breadcrumb'>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <div className='DefaultLayout__children-wrapper'>
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
