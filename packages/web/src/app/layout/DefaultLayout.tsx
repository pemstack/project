import React, { useState, FunctionComponent } from 'react'
import { Layout, Menu, Icon } from 'antd'
import { LanguageSelector, Loader, ProfileDropdown } from 'components'
import './DefaultLayout.css'
import { useTranslation } from 'react-i18next'

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
  return typeof value === 'undefined'
    ? fallbackValue
    : value
}

export const DefaultLayout: FunctionComponent<DefaultLayoutProps> = ({
  children,
  defaultMobile,
  defaultCollapsed
}) => {
  const { t } = useTranslation()
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
            <Icon type='read' />
            <span className='nav-text'><Loader>{t('Layout.label.newsfeed')}</Loader></span>
          </Menu.Item>
          <Menu.Item key='2'>
            <Icon type='book' />
            <span className='nav-text'><Loader>{t('Layout.label.courses')}</Loader></span>
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
          <span className='DefaultLayout__title'>Project name</span>
          <span className='DefaultLayout__profile-dropdown'>
            <ProfileDropdown />
          </span>
          <span className='DefaultLayout__language-selector'>
            <LanguageSelector />
          </span>
        </Header>
        <Content className='DefaultLayout__content'>
          <div className='DefaultLayout__wrapper'>
            {children}
          </div>
        </Content>
        <Footer className='DefaultLayout__footer'>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  )
}
