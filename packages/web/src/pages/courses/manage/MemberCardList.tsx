import { List, Spin } from 'antd'
import { CoursePermission } from 'api/courses.api'
import { DELETE_COURSE_MEMBER, GET_COURSE_MEMBERS } from 'api/members.api'
import { useLoadingAction, useQuery } from 'app'
import React, { FunctionComponent } from 'react'
import { MemberCard } from './MemberCard'

interface MemberCardListProps {
  courseId: string
}

interface MemberCardItemProps {
  courseId: string
  name: string | null
  email: string
  permission: CoursePermission
  status: 'member' | 'invited'
}

const MemberCardItem: FunctionComponent<MemberCardItemProps> = ({
  courseId,
  name,
  email,
  status,
  permission
}) => {
  const [deleteCourseMember, loading] = useLoadingAction(DELETE_COURSE_MEMBER)
  return (
    <Spin spinning={loading}>
      <MemberCard
        name={name}
        email={email}
        status={status}
        permission={permission}
        onDelete={() => deleteCourseMember({ courseId, email })}
      />
    </Spin>
  )
}

export const MemberCardList: FunctionComponent<MemberCardListProps> = ({
  courseId
}) => {
  const members = useQuery(GET_COURSE_MEMBERS, { courseId }).read()
  return (
    <List
      grid={{
        gutter: 16,
        xs: 1,
        sm: 1,
        md: 2,
        lg: 2,
        xl: 2,
        xxl: 3
      }}
      dataSource={members}
      rowKey='email'
      renderItem={({ name, email, status, permission }) => (
        <List.Item key={email}>
          <MemberCardItem
            courseId={courseId}
            name={name}
            email={email}
            status={status}
            permission={permission}
          />
        </List.Item>
      )}
    />
  )
}
