import React from 'react'
import { storiesOf } from '@storybook/react'
import { MemberCard, MemberCardItem } from './MemberCard'
import { List } from 'antd'

const users: MemberCardItem[] = [
  {
    avatar: '',
    fullName: 'Ardit Baloku Ardit Baloku',
    role: 'Student'
  },
  {
    avatar: '',
    fullName: 'Edon Gashi',
    role: 'Assistant Teacher'
  },
  {
    avatar: '',
    fullName: 'Laris Mahmutaj',
    role: 'Student'
  },
  {
    avatar: '',
    fullName: 'Ardit Baloku',
    role: 'Student'
  },
  {
    avatar: '',
    fullName: 'Edon Gashi',
    role: 'Assistant Teacher'
  },
  {
    avatar: '',
    fullName: 'Laris Mahmutaj',
    role: 'Student'
  },
  {
    avatar: '',
    fullName: 'Ardit Baloku',
    role: 'Student'
  },
  {
    avatar: '',
    fullName: 'Edon Gashi',
    role: 'Assistant Teacher'
  },
  {
    avatar: '',
    fullName: 'Laris Mahmutaj',
    role: 'Student'
  }
]

const cardStyle = {
  maxWidth: '320px',
  margin: '0 auto'
}

storiesOf('MemberCard', module)
  .addDecorator(story => (
    <div
      style={{
        background: '#eee',
        padding: '32px'
      }}
    >
      {story()}
    </div>
  ))
  .add('single', () => (
    <MemberCard
      style={cardStyle}
      item={{
        avatar: 'www.image.com/someimage.png',
        fullName: 'Name Surname',
        role: 'Student'
      }}
    />
  ))
  .add('loading', () => (
    <MemberCard
      loading
      style={cardStyle}
      item={{
        avatar: 'www.image.com/someimage.png',
        fullName: 'Name Surname',
        role: 'Student'
      }}
    />
  ))
  .add('list of members', () => (
    <>
      {users.map((user, i) => (
        <MemberCard key={i} style={cardStyle} item={user} />
      ))}
    </>
  ))
  .add('members grid', () => (
    <List
      itemLayout='horizontal'
      grid={{
        gutter: 16,
        xs: 1,
        sm: 2,
        md: 3,
        lg: 3,
        xl: 4,
        xxl: 4
      }}
      dataSource={users}
      renderItem={user => (
        <List.Item>
          <MemberCard item={user} />
        </List.Item>
      )}
    />
  ))
