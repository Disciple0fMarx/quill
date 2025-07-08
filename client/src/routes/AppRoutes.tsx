import { useEffect, type JSX } from 'react'
import { Routes, Route, Navigate, useParams } from 'react-router-dom'
import { useAuthContext } from '../context/AuthContext'
import Login from '../pages/auth/Login'
import Signup from '../pages/auth/Signup'
import Posts from '../pages/dashboard/Posts'
import Profile from '../pages/dashboard/Profile'
import NotFound from '../pages/404'
import Layout from '../components/Layout'
import { usePost, usePosts } from '../hooks/usePosts'
import PostDetail from '../components/dashboard/posts/PostDetail'
import CreatePost from '../pages/dashboard/CreatePost'
import EditPost from '../pages/dashboard/EditPost'
import Home from '../pages/Home'
import ApplyPage from '../pages/dashboard/Apply'
import AdminAppsPage from '../pages/admin/AdminAppsPage'
import LoadingSpinner from '../components/ui/LoadingSpinner'

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { user, isLoading } = useAuthContext()
  
  if (isLoading)
    return (
      <Layout>
        <LoadingSpinner size='md' center />
        {/* <div>Loading...</div> */}
      </Layout>
    )
  if (!user) return <Navigate to="/login" replace />
  
  return children
}

function PublicOnlyRoute({ children }: { children: JSX.Element }) {
  const { user, isLoading } = useAuthContext()

  if (isLoading) return <LoadingSpinner size='md' center /> /* <div>Loading...</div> */
  if (user) return <Navigate to="/posts" replace />

  return children
}

function AdminOnlyRoute({ children }: { children: JSX.Element }) {
  const { user, isLoading } = useAuthContext()

  if (isLoading) return <LoadingSpinner size='md' center /> /* <div>Loading...</div> */
  if (!user) return <Navigate to="/login" replace state={{ from: location.pathname }} />
  if (user.role !== 'ADMIN') return <Navigate to="/" replace />

  return children
}

const ProtectedPostRoute = () => {
  const { user } = useAuthContext()
  const { slug } = useParams()
  const { post, fetching, updating, error, fetchPost, updatePost } = usePost(slug || '')
  const { deletePost } = usePosts()

  useEffect(() => {
    fetchPost()
  }, [slug])

  const handlePublish = async () => await updatePost({ published: true })
  const handleUnpublish = async () => await updatePost({ published: false })
  const handleDelete = async (postId: string) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      await deletePost(postId)
    }
  }

  if (fetching) return <LoadingSpinner size='md' center /> /* <div>Loading...</div> */
  if (error) return <NotFound /> /* <div>An error has occured</div> */
  if (!post) return <NotFound /> /* <div>Post not found</div> */
  
  // Allow access if:
  // - Post is published, OR
  // - User is logged in AND is the author
  const canAccess = post.published || (user && post.author?.id === user.id)

  if (!canAccess) return <Navigate to="/login" />
  return (
    <PostDetail
      post={post}
      onPublish={handlePublish}
      onUnpublish={handleUnpublish}
      onDelete={handleDelete}
      updating={updating} />
  )
}

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={
        <PublicOnlyRoute>
          <Home />
        </PublicOnlyRoute>
      } />

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
        <ProtectedPostRoute />
      } />
      <Route path="/posts/new" element={
        <ProtectedRoute>
          <CreatePost />
        </ProtectedRoute>
      } />
      <Route path="/posts/:slug/edit" element={
        <ProtectedRoute>
          <EditPost />
        </ProtectedRoute>
      } />
      <Route path="/apply" element={
        <ProtectedRoute>
          <ApplyPage />
        </ProtectedRoute>
      } />

      {/* Protected dashboard routes */}
      <Route path="/posts" element={
        <ProtectedRoute>
          <Posts />
        </ProtectedRoute>
      } />
      <Route path="/profile" element={
        <ProtectedRoute>
          <Profile />
        </ProtectedRoute>
      } />
      
      <Route path="/admin/applications" element={
        <AdminOnlyRoute>
          <AdminAppsPage />
        </AdminOnlyRoute>
      } />

      {/* Redirects */}
      {/* <Route path="/" element={<Navigate to="/posts" replace />} /> */}
      <Route path="/dashboard" element={<Navigate to="/posts" replace />} />

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default AppRoutes
