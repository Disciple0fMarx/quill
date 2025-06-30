import { useParams } from 'react-router-dom'
import { usePost } from '../../hooks/usePosts'
import Post from '../../components/dashboard/posts/Post'

const PostPage = () => {
  const { slug } = useParams()
  const { post, loading, error } = usePost(slug || '')

  if (loading) return <div>Loading...</div>
  if (error) return <div>{error}</div>
  if (!post) return <div>Post not found</div>

  const safeAuthor = {
    name: post.author?.name || 'Anonymous'
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
    />
  )
}

export default PostPage
