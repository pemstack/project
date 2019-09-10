import React from 'react'
import { View, useAction, authorize, view } from 'app'
import { CourseCreateForm } from './CourseCreateForm'
import { Formik } from 'forms'
import { CREATE_COURSE } from './courses.api'
import slugify from 'slugify'
import { CenterContent } from 'components'

export const CourseCreateRoute: View = ({ app }) => {
	const createCourse = useAction(CREATE_COURSE)
	return (
		<CenterContent width='small'>
			<Formik
				initialValues={{
					title: '',
					access: 'private'
				}}
				onSubmit={async (values, actions) => {
					try {
						const { id, title } = await createCourse(values)
						app.messages.successKey('course.message.create')
						app.router.push(`/courses/manage/${id}/${slugify(title)}`)
					} finally {
						actions.setSubmitting(false)
					}
				}}
				validationSchema={createCourse.schema}
			>
				<CourseCreateForm />
			</Formik>
		</CenterContent>
	)
}

export default authorize({
	action: view(CourseCreateRoute)
})
