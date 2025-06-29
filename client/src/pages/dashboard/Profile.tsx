import { useProfile } from '../../hooks/useProfile'
import { useAuthContext } from '../../context/AuthContext'
import ProfileInfo from '../../components/dashboard/ProfileInfo'

export const Profile = () => {
  const { user: currentUser } = useAuthContext()
  const { profile, loading, error, refresh } = useProfile()

  if (!currentUser) {
    return <div>Please log in to view your profile</div>
  }

  if (loading) {
    return <div>Loading profile data...</div>
  }

  if (error) {
    return (
      <div>
        <p>Error loading profile: {error}</p>
        <button onClick={refresh}>Retry</button>
      </div>
    )
  }

  if (!profile) {
    return <div>No profile data available</div>
  }

  return <ProfileInfo profile={profile} onRefresh={refresh} />
}

export default Profile
