import React from 'react'
import { storiesOf } from '@storybook/react'
import { decorator } from 'app/mock'
import { InviteMembersForm } from './InviteMembersForm'
import { Formik } from 'forms'
import { CenterContent } from 'components'
import { inviteMembersSchema } from '../courses.api'

storiesOf('courses/InviteMembersForm', module)
  .addDecorator(decorator())
  .add('default', () => (
    <CenterContent>
      <Formik
        validationSchema={inviteMembersSchema}
        initialValues={{ emails: [], permission: 'read' }}
        onSubmit={(values, actions) => {
          console.log(values)
          actions.setSubmitting(false)
        }}
      >
        <InviteMembersForm />
      </Formik>
    </CenterContent >
  ))
