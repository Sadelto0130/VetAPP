import { useAuth } from '../context/AuthContext'

function ProfilePage() {

  const {user} = useAuth()

  return (
    <div>
      {JSON.stringify(user)}
    </div>
  )
}

export default ProfilePage