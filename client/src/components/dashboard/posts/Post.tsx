import { Link } from 'react-router-dom'

type PostProps = {
  id: string
  title: string
  slug: string
  author: { name: string }
  createdAt?: string | Date | null
  content?: string
  showContent?: boolean
  onDelete?: (id: string) => void
}

const Post = ({ 
  id,
  title,
  slug,
  author,
  createdAt,
  content,
  showContent = false,
  onDelete
}: PostProps) => {
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
      
      {onDelete && (
        <button onClick={() => onDelete(id)}>
          Delete Post
        </button>
      )}
    </article>
  )
}

export default Post
