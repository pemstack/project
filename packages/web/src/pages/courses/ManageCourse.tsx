import React, { FunctionComponent } from 'react'
import { Tabs, Button, List } from 'antd'
import { useTranslation } from 'react-i18next'
import { CoursePage } from './courses.api'
import { CollapseCard } from 'components'

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
            <h3>{t('ManageCourse.title.pages')}</h3>
            <List
              dataSource={pages}
              renderItem={page => (
                <List.Item
                  style={{ paddingTop: '24px', paddingBottom: '24px' }}
                  actions={[
                    <Button key='edit' icon='edit' style={{ color: 'blue' }} />,
                    <Button key='delete' icon='delete' style={{ color: 'red' }} />
                  ]}
                  key={page.id}
                >
                  {page.title}
                </List.Item>
              )}
            />
            <Button type='primary' icon='plus'>{t('ManageCourse.button.addPage')}</Button>
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
