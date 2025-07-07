import { Link } from "react-router-dom"
import { useAuthContext } from "../../../context/AuthContext"
import type { Post } from "../../../types"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

interface PostDetailProps {
  post: Post
  onPublish: () => Promise<void>
  onUnpublish: () => Promise<void>
  onDelete: (id: string) => void
  updating: boolean
}

const PostDetail = ({ post, onPublish, onUnpublish, onDelete, updating }: PostDetailProps) => {
  const { user } = useAuthContext()

  const isAuthor = post.author.id === user?.id

  // Simple line break preservation
  // const renderContent = (content: string) => {
  //   return content
  //     .split("\n")
  //     .map((paragraph, index) =>
  //       paragraph ? <p key={index}>{paragraph}</p> : <br key={index} />
  //     )
  // }

  return (
    <article>
      <header>
        <h1>{post.title}</h1>
        <div>
          <span>By {post.author?.name || "Unknown author"}</span>
          <span> • </span>
          <span>
            {post.createdAt
              ? new Date(post.createdAt).toLocaleDateString()
              : "No date"}
          </span>
        </div>
      </header>
      {isAuthor && (
        <div>
          <Link to={`/posts/${post.slug}/edit`}>
            <button disabled={updating}>Edit</button>
          </Link>
          {!post.published ? (
            <button onClick={onPublish} disabled={updating}>
              {updating ? "Publishing..." : "Publish"}
            </button>
          ) : (
            <button onClick={onUnpublish} disabled={updating}>
              {updating ? "Unpublishing..." : "Unpublish"}
            </button>
          )}
          <button onClick={() => onDelete(post.id)}>
            Delete
          </button>
        </div>
      )}
      {/* <section>{renderContent(post.content)}</section> */}
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
    </article>
  )
}

export default PostDetail
