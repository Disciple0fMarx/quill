import type { JSX } from 'react'
import { Routes, Route, Navigate, useParams } from 'react-router-dom'
import { useAuthContext } from '../context/AuthContext'
import Login from '../pages/auth/Login'
import Signup from '../pages/auth/Signup'
import Posts from '../pages/dashboard/Posts'
import Profile from '../pages/dashboard/Profile'
import NotFound from '../pages/404'
import Layout from '../components/Layout'
import { usePost } from '../hooks/usePosts'
import PostDetail from '../components/dashboard/posts/PostDetail'
import CreatePost from '../pages/dashboard/CreatePost'

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

const ProtectedPostRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuthContext()
  const { slug } = useParams()
  const { post, loading, error } = usePost(slug || '')

  if (loading) return <div>Loading...</div>
  if (error) return <div>Post not found</div>
  if (!post) return <div>Post not found</div>
  
  // Allow access if:
  // - Post is published, OR
  // - User is logged in AND is the author
  const canAccess = post.published || (user && post.author?.id === user.id)

  return canAccess ? children : <Navigate to="/login" />
}

const AppRoutes = () => {
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

      {/* Protected post routes */}
      <Route path="/posts/:slug" element={
        <ProtectedPostRoute>
          <PostDetail />
        </ProtectedPostRoute>
      } />
      <Route path="/dashboard/posts/new" element={
        <ProtectedRoute>
          <CreatePost />
        </ProtectedRoute>
      } />

      {/* <Route path="/posts/:slug" element={<PostDetail />} />
      <Route path="/dashboard/posts/:slug" element={
        <ProtectedRoute>
          <PostDetail />
        </ProtectedRoute>
      } /> */}

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
