import React, { Suspense, FunctionComponent } from 'react'
import { Layout } from 'antd'
import { LanguageSelector } from 'components'
import { Loading } from 'app/components'
import { Link } from '@pema/router-react'
import { useTranslation } from 'react-i18next'
import './AnonymousLayout.css'


const { Header, Content, Footer } = Layout

export interface AnonymousLayoutProps {
  children?: React.ReactNode
}

export const AnonymousLayout: FunctionComponent<AnonymousLayoutProps> = ({
  children
}) => {
  const { t } = useTranslation()
  return (
    <Layout className='AnonymousLayout'>
      <Header className='AnonymousLayout__header'>
        <Link className='AnonymousLayout__title' to='/'>InClass</Link>
        <Link className='AnonymousLayout__login' to='/user/login'>{t('Layout.anonymous.login')}</Link>
        <span className='AnonymousLayout__language-selector'>
          <LanguageSelector />
        </span>
      </Header>
      <Content className='AnonymousLayout__content'>
        <div className='AnonymousLayout__wrapper'>
          <Suspense fallback={<Loading />}>
            {children}
          </Suspense>
        </div>
      </Content>
    </Layout>
  )
}
