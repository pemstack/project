import React, { FunctionComponent } from 'react'
import { Card, Button, Descriptions } from 'antd'
import { Form, Input, SubmitButton } from 'forms'
import * as yup from 'yup'
import { useTranslation } from 'react-i18next'
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

export interface ProfileProps {
}

export const ProfileForm: FunctionComponent<ProfileProps> = ({
}) => {
  const { t } = useTranslation()
  return (
    <Card className='ProfileForm'>
      <Form className='ProfileForm__form'>
        <Descriptions
          title={t('user.label.profile')}
          bordered
          column={{ xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }}
        >
          <Descriptions.Item label={t('user.label.firstName')}>
            <Form.Item
              name='firstName'
            >
              <Input
                name='firstName'
                type='text'
                spellCheck={false}
              />
            </Form.Item>
          </Descriptions.Item>
          <Descriptions.Item label={t('user.label.lastName')}>
            <Form.Item
              name='lastName'
            >
              <Input
                name='lastName'
                type='text'
                spellCheck={false}
              />
            </Form.Item>
          </Descriptions.Item>
          <Descriptions.Item label={t('user.label.email')}>
          </Descriptions.Item>
        </Descriptions>
      </Form>
    </Card>
  )
}
