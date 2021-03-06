import React, { FunctionComponent } from 'react'
import { Form, Input, SubmitButton } from 'forms'
import { CollapseCard } from 'components'
import { useTranslation } from 'react-i18next'
import { Link } from '@pema/router-react'

export const RegisterForm: FunctionComponent = () => {
  const { t } = useTranslation()
  return (
    <CollapseCard
      className='RegisterForm'
    >
      <Form
        layout='vertical'
        className='RegisterForm__form'
        showCaptcha
      >
        <Form.AntdItem>
          <h2>{t('user.label.register')}</h2>
          <div>
            {t('user.label.existingAccount')} <Link to='/user/login'>{t('user.label.login')}</Link>
          </div>
        </Form.AntdItem>
        <Form.Item
          name='firstName'
          label={t('user.label.firstName')}
        >
          <Input
            name='firstName'
            type='text'
            spellCheck={false}
          />
        </Form.Item>
        <Form.Item
          name='lastName'
          label={t('user.label.lastName')}
        >
          <Input
            name='lastName'
            type='text'
            spellCheck={false}
          />
        </Form.Item>
        <Form.Item
          name='email'
          label={t('user.label.email')}
        >
          <Input
            name='email'
            type='text'
            spellCheck={false}
          />
        </Form.Item>
        <Form.Item
          name='password'
          label={t('user.label.password')}
        >
          <Input.Password
            name='password'
            type='password'
            spellCheck={false}
          />
        </Form.Item>
        <Form.AntdItem>
          <SubmitButton
            preventDisabling
            style={{width: '100%'}}
            className='RegisterForm__submit'
          >
           {t('user.label.register')}
          </SubmitButton>
        </Form.AntdItem>
      </Form>
    </CollapseCard>
  )
}
