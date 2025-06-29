import type { JSX } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from '../context/AuthContext'
import Login from '../pages/auth/Login'
import Signup from '../pages/auth/Signup'
import Posts from '../pages/dashboard/Posts'
import Profile from '../pages/dashboard/Profile'
import NotFound from '../pages/404'
import Layout from '../components/Layout'

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { user, isLoading } = useAuthContext()
  
  if (isLoading) return <Layout><div>Loading...</div></Layout>
  if (!user) return <Navigate to="/login" replace />
  
  return children
}

function PublicOnlyRoute({ children }: { children: JSX.Element }) {
  const { user, isLoading } = useAuthContext()

  if (isLoading) return <div>Loading...</div>
  if (user) return <Navigate to="/dashboard/posts" replace />

  return children
}

const AppRoutes =() => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={
        <PublicOnlyRoute>
          <Login />
        </PublicOnlyRoute>
      } />
      <Route path="/signup" element={
        <PublicOnlyRoute>
          <Signup />
        </PublicOnlyRoute>
      } />

      {/* Protected dashboard routes */}
      <Route path="/dashboard/posts" element={
        <ProtectedRoute>
          <Posts />
        </ProtectedRoute>
      } />
      <Route path="/dashboard/profile" element={
        <ProtectedRoute>
          <Profile />
        </ProtectedRoute>
      } />

      {/* Redirects */}
      <Route path="/" element={<Navigate to="/dashboard/posts" replace />} />
      <Route path="/dashboard" element={<Navigate to="/dashboard/posts" replace />} />

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default AppRoutes
