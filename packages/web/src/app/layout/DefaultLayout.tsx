import React, { useState, FunctionComponent } from 'react'
import { Layout, Menu, Icon } from 'antd'
import { RouteParams } from 'app/types'
import './DefaultLayout.css'

const { Header, Content, Footer, Sider } = Layout

export interface DefaultLayoutProps { }

function getWidth() {
  return typeof window !== 'undefined' && window.innerWidth
}

export const DefaultLayout: FunctionComponent<RouteParams & DefaultLayoutProps> = ({ children }) => {
  const width = getWidth()
  const [mobile, setMobile] = useState(width <= 576)
  const [collapsed, setCollapsed] = useState(width <= 768)

  function toggle() {
    setCollapsed(c => !c)
  }

  return (
    <Layout className='DefaultLayout'>
      <Sider
        className='DefaultLayout__sider'
        trigger={null}
        collapsed={collapsed}
        collapsedWidth={mobile ? 0 : undefined}
        breakpoint='sm'
        onBreakpoint={broken => setMobile(broken)}
      >
        <div className='DefaultLayout__logo' />
        <Menu theme='dark' mode='inline' defaultSelectedKeys={['1']}>
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
      </Sider>
      <Layout className='DefaultLayout__main'>
        <Header style={{ background: '#fff', padding: 0 }}>
          <Icon
            className='DefaultLayout__trigger'
            type={collapsed ? 'menu-unfold' : 'menu-fold'}
            onClick={toggle}
          />
        </Header>
        <Content className='DefaultLayout__content'>
          <div style={{ background: 'white' }}>
            content
            content
            content
            content
            content
            content
            content
            content
            content
            content
            content
          </div>
        </Content>
        <Footer className='DefaultLayout__footer'>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  )
}
