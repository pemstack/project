import React, { FunctionComponent } from 'react'
import { Card, Button } from 'antd'
import { Form, Input, SubmitButton } from 'forms'
import * as yup from 'yup'
import './ProfileForm.css'

interface ProfileFormProps {
  firstName: string,
  lastName: string,
  email: string,
  uniId: string
}

const profileSchema = yup.object({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().email().required(),
  uniId: yup.string().required()
})


export const ProfileForm: FunctionComponent<ProfileFormProps> = ({ firstName, lastName, email, uniId }) => {
  return (
    <Card className='ProfileForm' bodyStyle={{ padding: 0 }}>
      <Form className='ProfileForm__form'>
        <h2>Edit profile</h2>
        <Form.Item name='firstName'>
          <Input
            name='firstName'
            value={firstName}
          />
        </Form.Item>
        <Form.Item name='lastName'>
          <Input
            name='lastName'
            value={lastName}
          />
        </Form.Item>
        <Form.Item name='email'>
          <Input
            name='email'
            value={email}
          />
        </Form.Item>
        <Form.Item name='uniId'>
          <Input
            name='uniId'
            value={uniId}
          />
        </Form.Item>
        <Form.AntdItem>
          <Button>Cancel</Button>
          <SubmitButton
            preventDisabling
            className='ProfileForm__save'
          >
            Save
          </SubmitButton>
        </Form.AntdItem>
      </Form>
    </Card>
  )
}
