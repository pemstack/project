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


// export const ProfileForm: FunctionComponent<ProfileFormProps> = ({ firstName, lastName, email, uniId }) => {
//   return (
//     <Card className='ProfileForm' >
//       <Form className='ProfileForm__form'>
//         <h2>Edit profile</h2>
//         <Form.Item name='firstName'>
//           <Input
//             name='firstName'
//             value={firstName}
//           />
//         </Form.Item>
//         <Form.Item name='lastName'>
//           <Input
//             name='lastName'
//             value={lastName}
//           />
//         </Form.Item>
//         <Form.Item name='email'>
//           <Input
//             name='email'
//             value={email}
//           />
//         </Form.Item>
//         <Form.Item name='uniId'>
//           <Input
//             name='uniId'
//             value={uniId}
//           />
//         </Form.Item>
//         <Form.AntdItem>
//           <Button>Cancel</Button>
//           <SubmitButton
//             preventDisabling
//             className='ProfileForm__save'
//           >
//             Save
//           </SubmitButton>
//         </Form.AntdItem>
//       </Form>
//     </Card>
//   )
// }

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
