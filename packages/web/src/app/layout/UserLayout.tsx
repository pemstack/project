import { Link, useRouter } from '@pema/router-react'
import { Icon, Layout, Menu } from 'antd'
import { Loading } from 'app/components'
import { LanguageSelector, ProfileDropdownConnector } from 'components'
import React, { FunctionComponent, Suspense, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { NavbarTitle } from './NavbarTitle'
import './UserLayout.css'

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
  return typeof value === 'undefined' ? fallbackValue : value
}

export const UserLayout: FunctionComponent<UserLayoutProps> = ({
  children,
  defaultMobile,
  defaultCollapsed
}) => {
  const { t } = useTranslation()
  const width = getWidth()
  const [mobile, setMobile] = useState(fallback(defaultMobile, width <= 576))
  const [collapsed, setCollapsed] = useState(
    fallback(defaultCollapsed, width <= 768)
  )
  const router = useRouter()
  const { match } = router.current

  function toggle() {
    setCollapsed(c => !c)
  }

  const selectedKeys = match.isExact ? [match.path] : []
  if (match.path.indexOf('/courses') === 0 && selectedKeys[0] !== '/courses') {
    selectedKeys.push('/courses')
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
        <Menu theme='dark' mode='inline' selectedKeys={selectedKeys}>
          <Menu.Item key='/'>
            <Link to='/' className='nav-text'>
              <Icon type='read' />
              <span className='link-text'>{t('Layout.label.newsfeed')}</span>
            </Link>
          </Menu.Item>
          <Menu.Item key='/courses'>
            <Link to='/courses' className='nav-text'>
              <Icon type='book' />
              <span className='link-text'>{t('Layout.label.courses')}</span>
            </Link>
          </Menu.Item>
          <Menu.Item key='/invitations'>
            <Link to='/invitations' className='nav-text'>
              <Icon type='mail' />
              <span className='link-text'>{t('Layout.label.invitations')}</span>
            </Link>
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
          <Link to='/' className='UserLayout__title'>
            <NavbarTitle />
          </Link>
          <span className='UserLayout__header-profile'>
            <ProfileDropdownConnector />
          </span>
          <span className='UserLayout__header-language'>
            <LanguageSelector />
          </span>
        </Header>
        <Content className='UserLayout__content'>
          <div className='UserLayout__wrapper'>
            <Suspense fallback={<Loading />}>{children}</Suspense>
          </div>
        </Content>
        {/* <Footer className='UserLayout__footer'>
        </Footer> */}
      </Layout>
    </Layout>
  )
}
