import { usePosts } from '../../hooks/usePosts'
import Post from '../../components/dashboard/posts/Post'
import { useAuthContext } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const Posts = () => {
  const { posts, loading, error, pagination, fetchPosts, fetchUserPosts, deletePost } = usePosts()
  const { user } = useAuthContext()
  const navigate = useNavigate()

  const handleDelete = async (postId: string) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      await deletePost(postId)
    }
  }

  return (
    <div className="posts-container">
      <h1>Blog Posts</h1>
      
      {user && (
        <div className="posts-actions">
          <button onClick={() => fetchPosts()}>All Posts</button>
          <button onClick={() => fetchUserPosts()}>My Posts</button>
          <button onClick={() => navigate('/posts/new')}>New Post</button>
        </div>
      )}

      {loading && <div className="loading">Loading...</div>}
      {error && <div className="error">{error}</div>}

      <div className="posts-list">
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

      {pagination.totalPages > 1 && (
        <div className="pagination-controls">
          <button 
            disabled={pagination.currentPage === 1}
            onClick={() => fetchPosts(pagination.currentPage - 1)}
          >
            Previous
          </button>
          
          <span>
            Page {pagination.currentPage} of {pagination.totalPages}
          </span>
          
          <button 
            disabled={pagination.currentPage === pagination.totalPages}
            onClick={() => fetchPosts(pagination.currentPage + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  )
}

export default Posts
