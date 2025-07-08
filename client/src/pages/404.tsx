// src/pages/404.tsx
import { Link } from 'react-router-dom'
import { useAuthContext } from '../context/AuthContext'

export default function NotFound() {
  const { user } = useAuthContext()

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white shadow-sm dark:bg-gray-900 p-4 text-center">
        {/* <div className="mb-6">
          <svg className="w-24 h-24 mx-auto text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div> */}
        <h1 className="text-6xl font-bold text-green-600 dark:text-green-500 mb-4">
          404 - Not Found
        </h1>
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
          Lost in the digital woods?
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          The trail seems to end here. Let's get you back to familiar ground.
        </p>
        <Link 
          to={user ? '/posts' : '/login'}
          className="inline-block text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
          {user ? 'Go to Dashboard' : 'Go to Login'}
        </Link>
    </div>
  )
}
