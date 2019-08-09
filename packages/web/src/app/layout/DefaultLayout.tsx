import React, { useState, FunctionComponent } from 'react'
import { Layout, Menu, Icon } from 'antd'
import './DefaultLayout.css'
import { LanguageSelector } from 'components/LanguageSelector/LanguageSelector';
import { Loader } from 'components'

const { Header, Content, Footer, Sider } = Layout

export interface DefaultLayoutProps {
  children?: React.ReactNode
  defaultMobile?: boolean
  defaultCollapsed?: boolean
}

function getWidth() {
  return typeof window !== 'undefined' && window.innerWidth
}

function fallback(value: boolean | undefined, fallbackValue: boolean) {
  if (typeof value === 'undefined') {
    return value
  } else {
    return fallbackValue
  }
}

export const DefaultLayout: FunctionComponent<DefaultLayoutProps> = ({
  children,
  defaultMobile,
  defaultCollapsed
}) => {
  const width = getWidth()
  const [mobile, setMobile] = useState(fallback(defaultMobile, width <= 576))
  const [collapsed, setCollapsed] = useState(fallback(defaultCollapsed, width <= 768))

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
        <Header className='DefaultLayout__header'>
          <Icon
            className='DefaultLayout__trigger'
            type={collapsed ? 'menu-unfold' : 'menu-fold'}
            onClick={toggle}
          />
          <span className='DefaultLayout__language-selector'>
            <Loader>
              <LanguageSelector />
            </Loader>
          </span>
        </Header>
        <Content className='DefaultLayout__content'>
          {children}
        </Content>
        <Footer className='DefaultLayout__footer'>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  )
}
