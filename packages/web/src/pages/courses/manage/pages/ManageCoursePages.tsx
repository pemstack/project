import { Link } from '@pema/router-react'
import { Button, Empty, List, Modal, Select } from 'antd'
import { useLoadingAction, useQuery } from 'app'
import { CollapseCard, Flex, LinkButton } from 'components'
import React, { FunctionComponent } from 'react'
import { useTranslation } from 'react-i18next'
import { DELETE_COURSE_PAGE, GET_COURSE_PAGES, PageAccess, UPDATE_COURSE_PAGE } from '../../courses.api'
import { ManageCourseProps } from '../ManageCourse'
import './ManageCoursePages.css'

const { confirm } = Modal
const { Option } = Select

export const ManageCoursePages: FunctionComponent<ManageCourseProps> = ({
  courseId,
  courseDisplay
}) => {
  const { t } = useTranslation()
  const pages = useQuery(GET_COURSE_PAGES, { courseId }).read()
  const [deleteCoursePage, deleteLoading] = useLoadingAction(DELETE_COURSE_PAGE)
  const [updateCoursePageAccess, updateLoading] = useLoadingAction(UPDATE_COURSE_PAGE)

  return (
    <CollapseCard>
      <Flex justifyContent='space-between' alignItems='flex-start'>
        <h2 className='ManageCoursePages__title'>
          {t('ManageCourse.title.pages')}
        </h2>
        <LinkButton
          icon='plus'
          type='primary'
          to={`/courses/manage/${courseId}/${courseDisplay}/create-page`}
        >
          {t('button.create')}
        </LinkButton>
      </Flex>
      <List
        rowKey='pageId'
        locale={{
          emptyText: (
            <Empty description={t('ManageCourse.label.noPages')} />
          )
        }}
        loading={deleteLoading || updateLoading}
        dataSource={pages}
        size='large'
        renderItem={page => (
          <List.Item
            key={page.pageId}
            actions={[
              (
                <Select
                  key='visibility'
                  size='small'
                  dropdownStyle={{ border: 'none' }}
                  value={page.access}
                  onChange={async (access: PageAccess) => {
                    await updateCoursePageAccess({
                      courseId,
                      pageId: page.pageId,
                      access
                    })
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
                </Select>
              ),
              (
                <LinkButton
                  to={`/courses/${courseId}/${courseDisplay}/${page.pageId}/edit?redirect=manage`}
                  type='link'
                  key='edit'
                  icon='edit'
                />
              ),
              (
                <Button
                  type='link'
                  key='delete'
                  icon='delete'
                  className='color-danger'
                  onClick={() => {
                    confirm({
                      title: t('DeletePage.title'),
                      content: t('DeletePage.subtitle'),
                      okText: t('DeletePage.ok'),
                      okType: 'danger',
                      cancelText: t('DeletePage.cancel'),
                      onOk() {
                        deleteCoursePage({
                          courseId,
                          pageId: page.pageId
                        })
                      },
                      onCancel() { }
                    })
                  }}
                />
              )
            ]}
          >
            <span className='ManageCoursePages__item-content'>
              <Link to={`/courses/${courseId}/${courseDisplay}/${page.pageId}`}>{page.title}</Link>
            </span>
          </List.Item>
        )}
      />
    </CollapseCard >
  )
}
