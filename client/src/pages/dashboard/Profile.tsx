import { useProfile } from '../../hooks/useProfile'
import { useAuthContext } from '../../context/AuthContext'
import ProfileInfo from '../../components/dashboard/ProfileInfo'
import LoadingSpinner from '../../components/ui/LoadingSpinner'

export const Profile = () => {
  const { user: currentUser } = useAuthContext()
  const { profile, loading, error, refresh } = useProfile()

  if (!currentUser) {
    return (
      <div className="min-h-screen mt-16 p-6 flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="max-w-md p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md text-center">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
            Authentication Required
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Please log in to view your profile
          </p>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen mt-16 flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <LoadingSpinner size="md" center />
      </div>
    ) // <div>Loading profile data...</div>
  }

  if (error) {
    return (
      <div className="min-h-screen mt-16 p-6 flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="max-w-md p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md text-center">
          <h2 className="text-xl font-semibold text-red-600 dark:text-red-500 mb-4">
            Error Loading Profile
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">{error}</p>
          <button
            onClick={refresh}
            className="px-4 py-2 bg-green-600 dark:bg-green-700 text-white rounded hover:bg-green-700 dark:hover:bg-green-600 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="min-h-screen mt-16 p-6 flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="max-w-md p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md text-center">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
            No Profile Data
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            No profile data available
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-6 bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
      <ProfileInfo profile={profile} onRefresh={refresh} />
    </div>
  )
}

export default Profile
