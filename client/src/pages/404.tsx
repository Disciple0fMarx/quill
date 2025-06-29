// src/pages/404.tsx
import { Link } from 'react-router-dom'
import { useAuthContext } from '../context/AuthContext'

export default function NotFound() {
  const { user } = useAuthContext()

  return (
    <div>
      <h1>404 - Not Found</h1>
      <p>The page you're looking for doesn't exist.</p>
      <Link to={user ? '/dashboard/posts' : '/login'}>
        {user ? 'Go to Dashboard' : 'Go to Login'}
      </Link>
    </div>
  )
}
