import React, { useState, FunctionComponent } from 'react'
import { Layout, Menu, Icon } from 'antd'
import { LanguageSelector, Loader, ProfileDropdown } from 'components'
import './UserLayout.css'
import { useTranslation } from 'react-i18next'

const { Header, Content, Footer, Sider } = Layout

export interface UserLayoutProps {
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

export const UserLayout: FunctionComponent<UserLayoutProps> = ({
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
    <Layout className='UserLayout'>
      <Sider
        className='UserLayout__sider'
        trigger={null}
        collapsed={collapsed}
        collapsedWidth={mobile ? 0 : undefined}
        breakpoint='sm'
        onBreakpoint={broken => setMobile(broken)}
      >
        <div className='UserLayout__logo' />
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
      <Layout className='UserLayout__main'>
        <Header className='UserLayout__header'>
          <Icon
            className='UserLayout__trigger'
            type={collapsed ? 'menu-unfold' : 'menu-fold'}
            onClick={toggle}
          />
          <span className='UserLayout__title'>Project name</span>
          <span className='UserLayout__profile-dropdown'>
            <ProfileDropdown />
          </span>
          <span className='UserLayout__language-selector'>
            <LanguageSelector />
          </span>
        </Header>
        <Content className='UserLayout__content'>
          <div className='UserLayout__wrapper'>
            {children}
          </div>
        </Content>
        <Footer className='UserLayout__footer'>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  )
}
