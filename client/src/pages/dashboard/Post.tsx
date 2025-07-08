import { useParams } from 'react-router-dom'
import { usePost } from '../../hooks/usePosts'
import Post from '../../components/dashboard/posts/Post'
import { useAuthContext } from '../../context/AuthContext'
import { useEffect, useState } from 'react'
import LoadingSpinner from '../../components/ui/LoadingSpinner'
import NotFound from '../404'

const PostPage = () => {
  const { slug } = useParams<{ slug: string }>()
  const { user } = useAuthContext()
  const { post, fetching, updating, error, fetchPost, updatePost } = usePost(slug || '')
  const [updates, setUpdates] = useState({})

  useEffect(() => {
    if (slug) fetchPost()
  }, [slug])

  if (fetching) return <LoadingSpinner size='md' center />  /* <div>Loading...</div> */
  if (error) return <NotFound /> /* <div>{error}</div> */
  if (!post) return <NotFound /> /* <div>Post not found</div> */

  const isAuthor = post.author?.id === user?.id

  const safeAuthor = {
    id: post.author?.id || '',
    name: post.author?.name || 'Anonymous'
  }

  const handlePublish = async (updates: { name?: string, content?: string, published?: boolean }) => {
    if (!slug) return
    setUpdates({ published: true })
    await updatePost(updates)
  }

  return (
    <Post
      id={post.id}
      title={post.title}
      slug={post.slug || ''}
      author={safeAuthor}
      createdAt={post.createdAt || null}
      content={post.content}
      showContent={true}
      onPublish={isAuthor ? handlePublish : undefined}
      isAuthor={isAuthor}
      updates={updates}
      updating={updating}
    />
  )
}

export default PostPage
