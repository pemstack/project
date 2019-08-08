import React from 'react'
import { storiesOf } from '@storybook/react'
import { MemberCard, MemberCardProps } from './MemberCard'

const users: MemberCardProps[] = [
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
  maxWidth: '400px',
  margin: '0 auto'
}

storiesOf('MemberCard', module)
  .addDecorator(story => (
    <div
      style={{
        background: '#eee',
        paddingTop: '32px',
        paddingBottom: '32px'
      }}
    >
      {story()}
    </div>
  ))
  .add('single', () => (
    <MemberCard
      style={cardStyle}
      avatar='www.image.com/someimage.png'
      fullName='Name Surname'
      role='Student'
    />
  ))
  .add('loading', () => (
    <MemberCard
      style={cardStyle}
      avatar='www.image.com/someimage.png'
      fullName='Name Surname'
      role='Student'
      loading
    />
  ))
  .add('list of members', () => (
    <>
      {users.map((user, i) => (
        <MemberCard key={i} style={cardStyle} {...user} />
      ))}
    </>
  ))
