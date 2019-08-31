import React, { FunctionComponent } from 'react'
import { Tabs, Button, List } from 'antd'
import { useTranslation } from 'react-i18next'
import { CoursePage } from './courses.api'
import { CollapseCard, Flex, LinkButton } from 'components'
import './ManageCourse.css'

const { TabPane } = Tabs

interface ManageCourseProps {
  pages: CoursePage[]
}

export const ManageCourse: FunctionComponent<ManageCourseProps> = ({
  pages
}) => {
  const { t } = useTranslation()
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
                    <Button type='link' key='delete' icon='delete' className='color-danger'/>
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
