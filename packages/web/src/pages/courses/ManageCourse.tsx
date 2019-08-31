import React, { FunctionComponent } from 'react'
import { Modal, Tabs, Button, List } from 'antd'
import { useTranslation } from 'react-i18next'
import { GET_COURSE_PAGES, DELETE_COURSE_PAGE } from './courses.api'
import { CollapseCard, Flex, LinkButton } from 'components'
import { useQuery, useAction } from 'app'
import './ManageCourse.css'

const { confirm } = Modal
const { TabPane } = Tabs

interface ManageCourseProps {
  id: string
}

export const ManageCourse: FunctionComponent<ManageCourseProps> = ({
  id
}) => {
  const { t } = useTranslation()
  const pages = useQuery(GET_COURSE_PAGES, { id }).read()
  const deleteCoursePage = useAction(DELETE_COURSE_PAGE)

  return (
    <div className='ManageCourse'>
      <Tabs tabPosition='left' >
        <TabPane tab={t('ManageCourse.tab.pages')} key='pages'>
          <CollapseCard>
            <List
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
                    <Button type='link' key='edit' icon='edit' />,
                    <Button
                      type='link'
                      key='delete'
                      icon='delete'
                      className='color-danger'
                      onClick={() => {
                        confirm({
                          title: 'Are you sure delete this page?',
                          content: 'Once deleted, you can\'t bring it back',
                          okText: 'Yes',
                          okType: 'danger',
                          cancelText: 'No',
                          onOk() {
                            deleteCoursePage({ courseId: id, pageId: page.id })
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
