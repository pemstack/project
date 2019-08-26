import React from 'react'
import { storiesOf } from '@storybook/react'
import { List } from 'antd'
import { decorator } from 'app/mock'
import { MemberCard, MemberCardItem } from './MemberCard'

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

storiesOf('data-display/MemberCard', module)
  .addDecorator(decorator())
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
  .add('kickable', () => (
    <MemberCard
      style={cardStyle}
      item={{
        avatar: 'www.image.com/someimage.png',
        fullName: 'Name Surname',
        role: 'Student'
      }}
      kickable
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
