import { useParams } from "react-router-dom"
import { usePost } from "../../../hooks/usePosts"

const PostDetail = () => {
  const { slug } = useParams<{ slug: string }>()
  const { post, loading, error } = usePost(slug || "")

  if (loading)
    return <div>Loading...</div>
  if (error)
    return <div>Error: {error}</div>
  if (!post)
    return <div>Post not found</div>

  // Simple line break preservation
  const renderContent = (content: string) => {
    return content
      .split("\n")
      .map((paragraph, index) =>
        paragraph ? <p key={index}>{paragraph}</p> : <br key={index} />
      )
  }

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

      <section>{renderContent(post.content)}</section>
    </article>
  )
}

export default PostDetail
