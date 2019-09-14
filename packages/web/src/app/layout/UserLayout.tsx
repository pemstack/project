import React, { useState, FunctionComponent, Suspense } from 'react'
import { Link, useRouter } from '@pema/router-react'
import { Layout, Menu, Icon } from 'antd'
import { LanguageSelector, ProfileDropdownConnector } from 'components'
import { Loading } from 'app/components'
import { useTranslation } from 'react-i18next'
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
							{t('Layout.label.newsfeed')}
						</Link>
					</Menu.Item>
					<Menu.Item key='/courses'>
						<Link to='/courses' className='nav-text'>
							<Icon type='book' />
							{t('Layout.label.courses')}
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
						Project name
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
				<Footer className='UserLayout__footer'>
					Ant Design ©2018 Created by Ant UED
				</Footer>
			</Layout>
		</Layout>
	)
}
