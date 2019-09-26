import React, { FunctionComponent } from 'react'
import { CollapseCard } from 'components'
import { Form, Input, Radio, SubmitButton, MarkdownInput } from 'forms'
import { Tooltip, Icon, Upload } from 'antd'
import { useTranslation } from 'react-i18next'
import './EditPageForm.css'
import { Field, FieldProps } from 'formik'
import { ExistingFile } from '../courses.api'

const { Dragger } = Upload

export interface EditPageFormProps {
  existingFiles?: ExistingFile[]
}

export const EditPageForm: FunctionComponent<EditPageFormProps> = ({
  existingFiles = []
}) => {
  const { t } = useTranslation()

  return (
    <CollapseCard className='EditPageForm'>
      <Form layout='vertical' className='EditPageForm__form'>
        <h2>{t('EditPageForm.title')}</h2>
        <Form.Item name='title' label={t('EditPageForm.label.title')}>
          <Input name='title' type='text' spellCheck={false} />
        </Form.Item>
        <Form.Item name='access' label={t('CreateCourseForm.label.access')}>
          <Radio.Group
            name='access'
            options={[
              { label: t('CreateCourseForm.option.private'), value: 'private' },
              { label: t('CreateCourseForm.option.public'), value: 'public' }
            ]}
          />
          <Tooltip title={t('EditPageForm.tooltip')} placement='right'>
            <Icon type='question-circle' />
          </Tooltip>
        </Form.Item>
        <Form.Item name='content'>
          <div>
            <MarkdownInput name='content' />
          </div>
        </Form.Item>
        <Form.Item name='files'>
          <Field name='files'>
            {({ form: { values, setFieldValue } }: FieldProps) => {
              const newFiles = values.files || []
              const removedFiles = values.removedFiles || []
              let fileList = [...existingFiles, ...newFiles]
              if (removedFiles.length > 0) {
                fileList = fileList.filter(f => !removedFiles.includes(f.uid))
              }

              function unique(arr: ExistingFile[]) {
                return arr.filter((f, i) => arr.findIndex(f2 => f.uid === f2.uid) === i)
              }

              fileList = unique(fileList)

              return (
                <Dragger
                  multiple
                  fileList={fileList}
                  beforeUpload={(file, files) => {
                    setFieldValue('files', unique([...newFiles, ...files]))
                    return false
                  }}
                  onRemove={file => {
                    if (existingFiles.find(f => file.uid === f.uid)) {
                      setFieldValue('removedFiles', [...removedFiles, file.uid])
                    } else {
                      /* tslint:disable-next-line */
                      setFieldValue('files', newFiles.filter(f => file.uid !== f.uid))
                    }

                    return false
                  }}
                >
                  <p className='ant-upload-drag-icon'>
                    <Icon type='inbox' />
                  </p>
                  <p className='ant-upload-text'>Click or drag file to this area to upload</p>
                  <p className='ant-upload-hint'>
                    Support for a single or bulk upload. Strictly prohibit from uploading company data or other
                    band files
                  </p>
                </Dragger>
              )
            }}
          </Field>
        </Form.Item>
        <Form.AntdItem>
          <SubmitButton
            style={{ width: '100%' }}
            preventDisabling
            className='CreateCourseForm__submit'
          >
            {t('button.update')}
          </SubmitButton>
        </Form.AntdItem>
      </Form>
    </CollapseCard>
  )
}