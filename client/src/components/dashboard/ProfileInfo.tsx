import type { User } from '../../types'

interface ProfileInfoProps {
  profile: User
  onRefresh?: () => void
}

const ProfileInfo = ({ profile, onRefresh }: ProfileInfoProps) => {
  return (
    <div>
      <h1>User Profile</h1>
      
      <section>
        <h2>Account Information</h2>
        <p><strong>ID:</strong> {profile.id}</p>
        <p><strong>Email:</strong> {profile.email}</p>
        <p><strong>Name:</strong> {profile.name || 'Not specified'}</p>
        <p><strong>Account created:</strong> {profile.createdAt ? new Date(profile.createdAt).toLocaleString() : 'Unknown'}</p>
        <p><strong>Role:</strong> {profile.role || 'READER'}</p>
      </section>

      {onRefresh && (
        <div>
          <button onClick={onRefresh}>Refresh Data</button>
        </div>
      )}
    </div>
  )
}

export default ProfileInfo
