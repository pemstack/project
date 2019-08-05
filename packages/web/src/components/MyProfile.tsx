import React, { FunctionComponent } from 'react'
import { useQuery } from 'app'
import { ME } from 'api/user.api'

interface MyProfileProps { }

export const MyProfile: FunctionComponent<MyProfileProps> = ({ }) => {
  const { data: user, ready } = useQuery(ME)
  if (!ready) {
    return (
      <div>
        Loading profile...
      </div>
    )
  }

  if (!user) {
    return (
      <div>
        Not logged in.
      </div>
    )
  }

  return (
    <div className='MyProfile'>
      <table>
        <tbody>
          {Object.entries(user).map(([key, value]) => (
            <tr key={key}>
              <th>{key}</th>
              <td>{Array.isArray(value) ? value.join(', ') : value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
