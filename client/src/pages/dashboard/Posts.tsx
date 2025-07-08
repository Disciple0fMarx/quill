import { usePosts } from '../../hooks/usePosts'
import Post from '../../components/dashboard/posts/Post'
import { useAuthContext } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import LoadingSpinner from '../../components/ui/LoadingSpinner'
import NotFound from '../404'
import { useEffect, useState } from 'react'

const Posts = () => {
  const { posts, loading, error, pagination, fetchPosts, fetchUserPosts, deletePost } = usePosts()
  const { user } = useAuthContext()
  const navigate = useNavigate()
  const [activeFilter, setActiveFilter] = useState<'all' | 'my'>('all')

  useEffect(() => {
    fetchPosts()
  }, [])

  const handleDelete = async (postId: string) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      await deletePost(postId)
    }
  }

  const handleFetchAllPosts = () => {
    fetchPosts()
    setActiveFilter('all')
  }

  const handleFetchUserPosts = () => {
    fetchUserPosts()
    setActiveFilter('my')
  }

  return (
    <div className="posts-container mt-10 max-w-4xl mx-auto px-4 py-8">
      {/* <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">Blog Posts</h1> */}
      
      {user && (
        <div className="mb-6 border-b border-gray-200 dark:border-gray-700">
          <ul className="flex flex-wrap -mb-px text-sm font-medium text-center" role="tablist">
            <li className="me-2" role="presentation">
              <button
                onClick={handleFetchAllPosts}
                className={`inline-block p-4 border-b-2 rounded-t-lg ${
                  activeFilter === 'all'
                    ? 'text-green-600 border-green-600 dark:text-green-500 dark:border-green-500'
                    : 'border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'
                }`}
                role="tab"
                aria-selected={activeFilter === 'all'}
              >
                All Posts
              </button>
            </li>
            <li className="me-2" role="presentation">
              <button
                onClick={handleFetchUserPosts}
                className={`inline-block p-4 border-b-2 rounded-t-lg ${
                  activeFilter === 'my'
                    ? 'text-green-600 border-green-600 dark:text-green-500 dark:border-green-500'
                    : 'border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'
                }`}
                role="tab"
                aria-selected={activeFilter === 'my'}
              >
                My Posts
              </button>
            </li>
          </ul>
        </div>
      )}

      {loading && <LoadingSpinner />  /* <div className="loading">Loading...</div> */}
      {error && <NotFound /> /* <div className="error">{error}</div> */}

      <div className="posts-list">
        {posts.map(post => (
          <Post
            key={post.id}
            id={post.id}
            title={post.title}
            slug={post.slug || ''}
            author={post.author}
            createdAt={post.createdAt}
            onDelete={user?.id === post.author.id ? handleDelete : undefined}
            isAuthor={user?.id === post.author.id}
            published={post.published}
          />
        ))}
      </div>

      {pagination.totalPages > 1 && (
        <div className="pagination-controls flex items-center justify-center gap-4 mt-8">
          <button 
            disabled={pagination.currentPage === 1}
            onClick={() => fetchPosts(pagination.currentPage - 1)}
            className={`p-2 rounded-full transition-colors ${
              pagination.currentPage === 1
                ? "bg-gray-200 text-gray-400 dark:bg-gray-700 dark:text-gray-500"
                : "bg-gray-200 text-gray-800 hover:bg-green-600 hover:text-white dark:bg-gray-700 dark:text-white dark:hover:bg-green-600"
            }`}
            aria-label="Previous page"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M15 19l-7-7 7-7" 
              />
            </svg>
          </button>
          
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Page <span className="text-gray-700 dark:text-gray-200">{pagination.currentPage}</span> of <span className="text-gray-700 dark:text-gray-200">{pagination.totalPages}</span>
          </span>
          
          <button 
            disabled={pagination.currentPage === pagination.totalPages}
            onClick={() => fetchPosts(pagination.currentPage + 1)}
            className={`p-2 rounded-full transition-colors ${
              pagination.currentPage === pagination.totalPages
                ? "bg-gray-200 text-gray-400 dark:bg-gray-700 dark:text-gray-500"
                : "bg-gray-200 text-gray-800 hover:bg-green-600 hover:text-white dark:bg-gray-700 dark:text-white dark:hover:bg-green-600"
            }`}
            aria-label="Next page"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M9 5l7 7-7 7" 
              />
            </svg>
          </button>
        </div>
        // <div className="pagination-controls flex items-center justify-center gap-4 mt-8">
        //   <button 
        //     disabled={pagination.currentPage === 1}
        //     onClick={() => fetchPosts(pagination.currentPage - 1)}
        //     className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 disabled:opacity-50 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
        //   >
        //     Previous
        //   </button>
          
        //   <span className="text-gray-700 dark:text-gray-300">
        //     Page {pagination.currentPage} of {pagination.totalPages}
        //   </span>
          
        //   <button 
        //     disabled={pagination.currentPage === pagination.totalPages}
        //     onClick={() => fetchPosts(pagination.currentPage + 1)}
        //     className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 disabled:opacity-50 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
        //   >
        //     Next
        //   </button>
        // </div>
      )}
      {user && (
        <button 
          onClick={() => navigate('/posts/new')}
          className="fixed bottom-6 right-6 p-4 flex items-center gap-2 px-4 py-3 bg-green-600 text-white rounded-full shadow-lg hover:bg-green-700 transition-colors"
          aria-label="Create new post"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M12 4v16m8-8H4" 
            />
          </svg>
          <span className="text-sm font-medium">New Post</span>
        </button>
      )}
    </div>
  )
}

export default Posts
