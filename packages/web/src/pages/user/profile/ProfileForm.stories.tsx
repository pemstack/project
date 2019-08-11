import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { AppProvider, decorator } from 'app/mock'
import { Formik } from 'forms'
import * as yup from 'yup'
import { Profile, ProfileItem } from './Profile'
import { ProfileForm } from './ProfileForm'

const profile: ProfileItem = {
  id: '123',
  firstName: 'Filan',
  lastName: 'Fisteku',
  email: 'filan@example.com',
  roles: ['Student']
}

storiesOf('Profile', module)
  .addDecorator(decorator())
  .add('view only', () => (
    <Profile item={profile} />
  ))
