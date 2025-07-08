import { Link } from 'react-router-dom'
import type { User } from '../../../types'
// import type { Post as PostType } from '../../../types'

interface PostUpdates {
  title?: string
  content?: string
  published?: boolean
}

type PostProps = {
  id: string
  title: string
  slug: string
  author: { id: string, name: string } | User
  createdAt?: string | Date | null
  content?: string
  published?: boolean
  showContent?: boolean
  onDelete?: (id: string) => void
  onPublish?: (updates: PostUpdates) => void
  isAuthor?: boolean
  updates?: PostUpdates
  updating?: boolean
}

const Post = ({
  id,
  title,
  slug,
  author,
  createdAt,
  content,
  published,
  showContent = false,
  onDelete,
  isAuthor = false,
}: PostProps) => {
  // const { user } = useAuthContext()
  // const { updating, updatePost } = usePost()

  // const handlePublish = async () => await updatePost(slug, { published: true })

  // const isAuthor = author.id === user?.id

  return (
    <div className="group relative">
      <Link to={`/posts/${slug}`} className="no-underline">
        <article className="bg-white dark:bg-gray-800 rounded-lg shadow-md dark:shadow-gray-900/30 p-6 mb-6 hover:shadow-lg dark:hover:shadow-gray-900/50 transition-shadow duration-200 pb-14">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 group-hover:text-green-600 dark:group-hover:text-green-400 mb-2">{title}</h2>
          <div className="text-gray-500 dark:text-gray-400 text-sm mb-4">
            By <span className="font-medium text-gray-700 dark:text-gray-300">{author.name}</span> • {new Date(createdAt!).toLocaleDateString()}
          </div>
          
          {showContent && content && (
            <div>
              {content.split('\n').map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          )}

          {/* {isAuthor && (
            <div>
              {!published && <span>Not published</span>}
              <Link to={`/posts/${slug}/edit`}>
                <button>Edit</button>
              </Link>
              {onDelete && (
                <button onClick={() => onDelete(id)}>
                  Delete
                </button>
              )}
            </div>
          )} */}
        </article>
      </Link>

      {isAuthor && (
        <div className="absolute bottom-4 right-4 md:bottom-4 md:right-4 flex items-center gap-3 px-2 mt-4">
          {!published && (
            <span className="inline-flex items-center gap-1 px-3 py-1 text-sm text-amber-700 bg-amber-100 rounded-full dark:bg-amber-900/30 dark:text-amber-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              Draft
            </span>
          )}
          
          <Link 
            to={`/posts/${slug}/edit`}
            className="inline-flex items-center gap-1 px-3 py-1 text-sm text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 dark:text-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Edit
          </Link>
          
          {onDelete && (
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onDelete(id);
              }}
              className="inline-flex items-center gap-1 px-3 py-1 text-sm text-red-700 bg-red-100 rounded-md hover:bg-red-200 dark:text-red-300 dark:bg-red-900/30 dark:hover:bg-red-900/50 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Delete
            </button>
          )}
        </div>
      )}
    </div>
  )
}

export default Post
