import React, { FunctionComponent } from 'react'
import { Link } from '@pema/router-react'
import { Card } from 'antd'
import { Form, Input, Icon, Checkbox, SubmitButton } from 'forms'
import { useTranslation } from 'react-i18next'
import './LoginForm.css'

interface LoginFormProps {
  error?: string | null
}

export const LoginForm: FunctionComponent<LoginFormProps> = ({
  error
}) => {
  const { t } = useTranslation()
  return (
    <Card
      className='LoginForm'
      bodyStyle={{ padding: 0 }}
    >
      <Form
        className='LoginForm__form'
        showCaptcha
      >
        <h2>{t('user.label.login')}</h2>
        {error && <div className='LoginForm__error'>{error}</div>}
        <Form.Item name='username'>
          <Input
            name='username'
            prefix={<Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder={t('user.label.username')}
          />
        </Form.Item>
        <Form.Item name='password'>
          <Input
            name='password'
            prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />}
            type='password'
            placeholder={t('user.label.password')}
          />
        </Form.Item>
        <Form.AntdItem>
          <Checkbox name='persist'>{t('user.label.remember')}</Checkbox>
          <Link className='LoginForm__forgot' to='/user/forgot-password'>{t('user.label.forgotPass')}</Link>
          <SubmitButton
            preventDisabling
            block
            className='LoginForm__submit'
          >
            {t('user.label.login')}
          </SubmitButton>
          <Link to='/user/register'>{t('user.label.register')}</Link>
        </Form.AntdItem>
      </Form>
    </Card>
  )
}
