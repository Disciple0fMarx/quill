import { usePosts } from '../../hooks/usePosts'
import Post from '../../components/dashboard/posts/Post'
import { useAuthContext } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const Posts = () => {
  const { posts, loading, error, fetchPosts, fetchUserPosts, deletePost } = usePosts()
  const { user } = useAuthContext()
  const navigate = useNavigate()

  const handleDelete = async (postId: string) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      await deletePost(postId)
    }
  }

  return (
    <div>
      <h1>Blog Posts</h1>
      
      {user && (
        <div>
          <button onClick={fetchPosts}>All Posts</button>
          <button onClick={fetchUserPosts}>My Posts</button>
          <button onClick={() => navigate('/posts/new')}>New Post</button>
        </div>
      )}

      {loading && <div>Loading...</div>}
      {error && <div>{error}</div>}

      {posts.map(post => (
        <Post
          key={post.id}
          id={post.id}
          title={post.title}
          slug={post.slug}
          author={post.author}
          createdAt={post.createdAt}
          onDelete={post.author.id === user?.id ? handleDelete : undefined}
          isAuthor={post.author.id === user?.id}
          published={post.published}
        />
      ))}
    </div>
  )
}

export default Posts
