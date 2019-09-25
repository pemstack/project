import React, { FunctionComponent, useState } from 'react'
import { Modal, Tabs, List, Select, Button, Empty } from 'antd'
import { useTranslation } from 'react-i18next'
import {
  GET_COURSE_PAGES,
  DELETE_COURSE_PAGE,
  UPDATE_COURSE_PAGE,
  CREATE_COURSE_PAGE,
  PageAccess
} from '../courses.api'
import { CollapseCard, Flex, LinkButton } from 'components'
import { useQuery, useAction } from 'app'
import './ManageCourse.css'
import { Formik, Form, Input } from 'forms'
import { Link } from '@pema/router-react'
import { InviteMembersModal } from '../invite/InviteMembersModal'

const { confirm } = Modal
const { TabPane } = Tabs
const { Option } = Select

interface CreatePageModalProps {
  courseId: string
  visible: boolean
  setLoading(loading: boolean): void
  onClose(): void
}

export const CreatePageModal: FunctionComponent<CreatePageModalProps> = ({
  courseId,
  visible,
  onClose,
  setLoading
}) => {
  const createCoursePage = useAction(CREATE_COURSE_PAGE)
  function close() {
    if (typeof onClose === 'function') {
      onClose()
    }
  }

  return (
    <Formik
      onSubmit={async ({ title }, actions) => {
        const finish = () => setLoading(false)
        setLoading(true)
        createCoursePage({
          courseId,
          title
        }).then(finish, finish)
        close()
        actions.resetForm()
        actions.setSubmitting(false)
      }}
      initialValues={{
        title: ''
      }}
      render={props => (
        <Modal
          title='Enter page title'
          visible={visible}
          onCancel={close}
          onOk={() => {
            props.submitForm()
          }}
        >
          <Form>
            <Form.Item name='title'>
              <Input name='title' type='text' spellCheck={false} />
            </Form.Item>
          </Form>
        </Modal>
      )}
    />
  )
}

interface ManageCourseProps {
  courseId: string
  display: string
}

export const ManageCoursePages: FunctionComponent<ManageCourseProps> = ({
  courseId,
  display
}) => {
  const { t } = useTranslation()
  const { read, reloading } = useQuery(GET_COURSE_PAGES, { courseId })
  const pages = read()
  const deleteCoursePage = useAction(DELETE_COURSE_PAGE)
  const updateCoursePageAccess = useAction(UPDATE_COURSE_PAGE)
  const [loading, setLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)

  return (
    <CollapseCard>
      <CreatePageModal
        courseId={courseId}
        visible={showModal}
        onClose={() => setShowModal(false)}
        setLoading={setLoading}
      />
      <List
        rowKey='pageId'
        locale={{
          emptyText: (
            <Empty description={t('ManageCourse.label.noPages')} />
          )
        }}
        loading={loading || reloading}
        dataSource={pages}
        size='large'
        header={
          <Flex justifyContent='space-between' alignItems='center'>
            <h2 className='ManageCourse__title'>
              {t('ManageCourse.title.pages')}
            </h2>
            <Button
              type='primary'
              icon='plus'
              onClick={() => setShowModal(true)}
            >
              {t('button.create')}
            </Button>
          </Flex>
        }
        renderItem={page => (
          <List.Item
            key={page.pageId}
            actions={[
              <Select
                key='visibility'
                size='small'
                dropdownStyle={{ border: 'none' }}
                value={page.access}
                onChange={async (access: PageAccess) => {
                  try {
                    setLoading(true)
                    await updateCoursePageAccess({
                      courseId,
                      pageId: page.pageId,
                      access
                    })
                  } finally {
                    setLoading(false)
                  }
                }}
              >
                <Option value='private'>
                  {t('ManageCourse.label.private')}
                </Option>
                <Option value='public'>
                  {t('ManageCourse.label.public')}
                </Option>
                <Option value='unlisted'>
                  {t('ManageCourse.label.unlisted')}
                </Option>
              </Select>,
              <LinkButton
                to={`/courses/${courseId}/${display}/${page.pageId}/edit`}
                type='link'
                key='edit'
                icon='edit'
              />,
              <Button
                type='link'
                key='delete'
                icon='delete'
                className='color-danger'
                onClick={() => {
                  confirm({
                    title: 'Are you sure you want to delete this page?',
                    content: 'Once deleted, you can\'t bring it back',
                    okText: 'Yes',
                    okType: 'danger',
                    cancelText: 'No',
                    onOk() {
                      setLoading(true)
                      const finish = () => setLoading(false)
                      deleteCoursePage({
                        courseId,
                        pageId: page.pageId
                      }).then(finish, finish)
                    },
                    onCancel() { }
                  })
                }}
              />
            ]}
          >
            <span className='ManageCourse__item-content'>
              <Link to={`/courses/${courseId}/${display}/${page.pageId}`}>{page.title}</Link>
            </span>
          </List.Item>
        )}
      />
    </CollapseCard>
  )
}

const ManageCourseMembers: FunctionComponent<ManageCourseProps> = ({
  courseId,
  display
}) => {
  const { t } = useTranslation()
  const [loading, setLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)

  return (
    <CollapseCard>
      <InviteMembersModal
        courseId={courseId}
        visible={showModal}
        onClose={() => setShowModal(false)}
        setLoading={setLoading}
      />
      <Flex justifyContent='space-between' alignItems='center'>
        <h2 className='ManageCourse__title'>
          {t('ManageCourse.title.members')}
        </h2>
        <Button
          type='primary'
          icon='plus'
          onClick={() => setShowModal(true)}
        >
          {t('button.invite')}
        </Button>
      </Flex>
    </CollapseCard>
  )
}

export const ManageCourse: FunctionComponent<ManageCourseProps> = ({ courseId, display }) => {
  const { t } = useTranslation()
  return (
    <div className='ManageCourse'>
      <Tabs tabPosition='left'>
        <TabPane tab={t('ManageCourse.tab.pages')} key='pages'>
          <ManageCoursePages courseId={courseId} display={display} />
        </TabPane>
        <TabPane tab={t('ManageCourse.tab.members')} key='members'>
          <ManageCourseMembers courseId={courseId} display={display} />
        </TabPane>
      </Tabs>
    </div>
  )
}
