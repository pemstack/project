import React, { FunctionComponent } from 'react'
import { Form, SubmitButton, Radio, EmailSelect } from 'forms'
import { useTranslation } from 'react-i18next'

const children: Array<any> = []

export const InviteMembersForm: FunctionComponent = ({ }) => {
  const { t } = useTranslation()
  return (
    <Form>
      <h2>{t('InviteMembersForm.title')}</h2>
      <Form.Item name='emails'>
        <EmailSelect
          name='emails'
          style={{ width: '100%' }}
        >
          {children}
        </EmailSelect>
      </Form.Item>
      <Form.Item name='permission' label={t('InviteMembersForm.label.permission')}>
        <Radio.Group
          name='permission'
          options={[
            { label: t('InviteMembersForm.label.read'), value: 'read' },
            { label: t('InviteMembersForm.label.write'), value: 'write' }
          ]}
        />
      </Form.Item>
      <Form.Item name='submit'>
        <SubmitButton>{t('button.submit')}</SubmitButton>
      </Form.Item>
    </Form>
  )
}
