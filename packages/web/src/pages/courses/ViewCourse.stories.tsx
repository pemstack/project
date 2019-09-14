import React, { FunctionComponent, useState } from 'react'
import { storiesOf } from '@storybook/react'
import { decorator } from 'app/mock'
import { ViewCourse } from './ViewCourse'
import { AnonymousLayout } from 'app/layout/AnonymousLayout'
import { UserLayout } from 'app/layout/UserLayout'
import { mockCourses } from './courses.mocks'
import { CenterContent } from 'components'

interface WithInputProps {
	children?: (text: string) => React.ReactNode
}

export const WithInput: FunctionComponent<WithInputProps> = ({ children }) => {
	const [text, setText] = useState('siguria')
	return (
		<div className='WithInput'>
			Course id:{' '}
			<input type='text' value={text} onChange={e => setText(e.target.value)} />
			<div style={{ paddingTop: '16px' }}>{children && children(text)}</div>
		</div>
	)
}

storiesOf('courses/ViewCourse', module)
	.addDecorator(decorator({ apiMocks: mockCourses }))
	.add('with id', () => (
		<WithInput>
			{id => {
				if (id) {
					return <ViewCourse id={id} />
				} else {
					return <div>Enter id...</div>
				}
			}}
		</WithInput>
	))
	.add('with user layout', () => (
		<UserLayout>
			<CenterContent>
				<ViewCourse id='siguria' />
			</CenterContent>
		</UserLayout>
	))
	.add('with anonymous layout', () => (
		<AnonymousLayout>
			<CenterContent>
				<ViewCourse id='siguria' />
			</CenterContent>
		</AnonymousLayout>
	))
