import React, { FunctionComponent, useState } from 'react'
import { Modal, Tabs, List, Select, Button, Empty } from 'antd'
import { useTranslation } from 'react-i18next'
import { GET_COURSE_PAGES, DELETE_COURSE_PAGE, UPDATE_COURSE_PAGE_ACCESS, PageAccess } from './courses.api'
import { CollapseCard, Flex, LinkButton } from 'components'
import { useQuery, useAction } from 'app'
import './ManageCourse.css'

const { confirm } = Modal
const { TabPane } = Tabs
const { Option } = Select

interface ManageCourseProps {
  id: string
}

export const ManageCourse: FunctionComponent<ManageCourseProps> = ({
  id
}) => {
  const { t } = useTranslation()
  const { read, reloading } = useQuery(GET_COURSE_PAGES, { id })
  const pages = read()
  const deleteCoursePage = useAction(DELETE_COURSE_PAGE)
  const updateCoursePageAccess = useAction(UPDATE_COURSE_PAGE_ACCESS)
  const [loading, setLoading] = useState(false)

  return (
    <div className='ManageCourse'>
      <Tabs tabPosition='left' >
        <TabPane tab={t('ManageCourse.tab.pages')} key='pages'>
          <CollapseCard>
            <List
              locale={{
                emptyText: <Empty description={t('ManageCourse.label.noPages')} />
              }}
              loading={loading || reloading}
              dataSource={pages}
              size='large'
              header={
                <Flex justifyContent='space-between' alignItems='center'>
                  <h2 className='ManageCourse__title'>{t('ManageCourse.title.pages')}</h2>
                  <LinkButton
                    to='/courses/create'
                    type='primary'
                    icon='plus'
                  >
                    {t('button.create')}
                  </LinkButton>
                </Flex>
              }
              renderItem={page => (
                <List.Item
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
                            courseId: id,
                            pageId: page.id,
                            access
                          })
                        } finally {
                          setLoading(false)
                        }
                      }}
                    >
                      <Option value='private'>{t('ManageCourse.label.private')}</Option>
                      <Option value='public'>{t('ManageCourse.label.public')}</Option>
                      <Option value='unlisted'>{t('ManageCourse.label.unlisted')}</Option>
                    </Select>,
                    <Button type='link' key='edit' icon='edit' />,
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
                            deleteCoursePage({ courseId: id, pageId: page.id })
                              .then(finish, finish)
                          },
                          onCancel() {
                          }
                        })
                      }}
                    />
                  ]}
                  key={page.id}
                >
                  {page.title}
                </List.Item>
              )}
            />
          </CollapseCard>
        </TabPane>
        <TabPane tab={t('ManageCourse.tab.students')} key='students'>
          <CollapseCard>
            <h3>{t('ManageCourse.title.students')}</h3>
          </CollapseCard>
        </TabPane>
      </Tabs>
    </div>
  )
}
