import React, { FunctionComponent, useState } from 'react'
import { Form, Input, Button, Icon, SubmitButton, Radio, Select } from 'forms'
import { useTranslation } from 'react-i18next'
import { inviteMembersSchema } from './courses.api'

export const InviteMembersForm: FunctionComponent = ({ }) => {
  const children: Array<any> = []
  const { t } = useTranslation()
  return (
    <Form>
      <Form.Item name='emails'>
        <Select
          name='emails'
          mode='tags'
          style={{ width: '100%' }}
          tokenSeparators={[',', ';', ' ', '\n', '\r\n']}
        >
          {children}
        </Select>
      </Form.Item>
      <Form.Item name='permission' label={t('CreateCourseForm.label.permission')}>
        <Radio.Group
          name='permission'
          options={[
            { label: 'Read', value: 'read' },
            { label: 'Write', value: 'write' }
          ]}
        />
      </Form.Item>
      <Form.Item name='submit'>
        <SubmitButton>Submit</SubmitButton>
      </Form.Item>
    </Form>
  )
}


