import { Link } from 'react-router-dom'
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
  author: { id: string, name: string }
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
  isAuthor,
}: PostProps) => {
  // const { user } = useAuthContext()
  // const { updating, updatePost } = usePost()

  // const handlePublish = async () => await updatePost(slug, { published: true })

  // const isAuthor = author.id === user?.id

  return (
    <article>
      <Link to={`/posts/${slug}`}>
        <h2>{title}</h2>
      </Link>
      <div>
        By {author.name} • {new Date(createdAt!).toLocaleDateString()}
      </div>
      
      {showContent && content && (
        <div>
          {content.split('\n').map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      )}

      {isAuthor && (
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
      )}
    </article>
  )
}

export default Post
