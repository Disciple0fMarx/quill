import type { User } from '../../types'

interface ProfileInfoProps {
  profile: User
  onRefresh?: () => void
}

const ProfileInfo = ({ profile, onRefresh }: ProfileInfoProps) => {
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      
      
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-green-600 dark:text-green-400 mb-4 pb-2 border-b border-green-200 dark:border-green-800">Account Information</h2>
        <div className="space-y-3">
          <p>
            <strong className="w-40 text-gray-700 dark:text-gray-300">ID:</strong>
            {' '}
            <span className="text-gray-900 dark:text-gray-100">{profile.id}</span>
          </p>
          <p>
            <strong className="w-40 text-gray-700 dark:text-gray-300">Email:</strong>
            {' '}
            <span className="text-gray-900 dark:text-gray-100">{profile.email}</span>
          </p>
          <p>
            <strong className="w-40 text-gray-700 dark:text-gray-300">Name:</strong>
            {' '}
            <span className="text-gray-900 dark:text-gray-100">{profile.name || 'Not specified'}</span>
          </p>
          <p>
            <strong className="w-40 text-gray-700 dark:text-gray-300">Account created:</strong>
            {' '}
            <span className="text-gray-900 dark:text-gray-100">
              {profile.createdAt ? new Date(profile.createdAt).toLocaleString() : 'Unknown'}
            </span>
          </p>
          <p>
            <strong className="w-40 text-gray-700 dark:text-gray-300">Role:</strong>
            {' '}
            <span className="text-gray-900 dark:text-gray-100">{profile.role || 'READER'}</span>
          </p>
        </div>
      </section>

      {onRefresh && (
        <div className="flex justify-center">
          <button
            onClick={onRefresh}
            className="px-4 py-2 bg-green-600 dark:bg-green-700 text-white rounded hover:bg-green-700 dark:hover:bg-green-600 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
          >
            Refresh Data
          </button>
        </div>
      )}
    </div>
  )
}

export default ProfileInfo
