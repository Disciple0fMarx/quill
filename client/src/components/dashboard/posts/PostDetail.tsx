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

  return (
    <article className="max-w-4xl mx-auto px-4 py-8 mt-11">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4">
          {post.title}
        </h1>
        <div className="text-gray-500 dark:text-gray-400">
          <span className="font-medium text-gray-700 dark:text-gray-300">
            By {post.author?.name || "Unknown author"}
          </span>
          <span> • </span>
          <span>
            {post.createdAt
              ? new Date(post.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })
              : "No date"}
          </span>
          {post.published && (
            <span className="ml-2 px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full dark:bg-green-900/30 dark:text-green-400">
              Published
            </span>
          )}
        </div>
      </header>

      {isAuthor && (
        <div className="flex flex-wrap gap-3 mb-8 border-b border-gray-200 dark:border-gray-700 pb-6">
          <Link
            to={`/posts/${post.slug}/edit`}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-300"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Edit
          </Link>
          
          {!post.published ? (
            <button
              onClick={onPublish}
              disabled={updating}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                updating
                  ? 'bg-gray-300 text-gray-500 dark:bg-gray-600 dark:text-gray-300 cursor-not-allowed'
                  : 'bg-green-600 hover:bg-green-700 text-white dark:bg-green-700 dark:hover:bg-green-800'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
              {updating ? "Publishing..." : "Publish"}
            </button>
          ) : (
            <button
              onClick={onUnpublish}
              disabled={updating}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                updating
                  ? 'bg-gray-300 text-gray-500 dark:bg-gray-600 dark:text-gray-300 cursor-not-allowed'
                  : 'bg-amber-600 hover:bg-amber-700 text-white dark:bg-amber-700 dark:hover:bg-amber-800'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
              </svg>
              {updating ? "Unpublishing..." : "Unpublish"}
            </button>
          )}
          
          <button
            onClick={() => onDelete(post.id)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors dark:bg-red-700 dark:hover:bg-red-800"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Delete
          </button>
        </div>
      )}

      <section className="prose dark:prose-invert max-w-none">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            h1: ({ node, ...props }) => <h1 className="text-3xl font-bold my-4" {...props} />,
            h2: ({ node, ...props }) => <h2 className="text-2xl font-bold my-4" {...props} />,
            h3: ({ node, ...props }) => <h3 className="text-xl font-bold my-3" {...props} />,
            p: ({ node, ...props }) => <p className="my-4 leading-relaxed" {...props} />,
            ul: ({ node, ...props }) => <ul className="list-disc pl-5 my-4" {...props} />,
            ol: ({ node, ...props }) => <ol className="list-decimal pl-5 my-4" {...props} />,
            li: ({ node, ...props }) => <li className="my-2" {...props} />,
            blockquote: ({ node, ...props }) => (
              <blockquote className="border-l-4 border-green-500 pl-4 italic my-4" {...props} />
            ),
            code: ({ node, ...props }) => (
              <code className="bg-gray-100 dark:bg-gray-700 rounded px-1 py-0.5 font-mono" {...props} />
            ),
            pre: ({ node, ...props }) => (
              <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto my-4" {...props} />
            ),
            a: ({ node, ...props }) => (
              <a className="text-green-600 hover:underline dark:text-green-400" {...props} />
            ),
            img: ({ node, ...props }) => (
              <img className="max-w-full h-auto rounded-lg my-4" {...props} />
            ),
            table: ({ node, ...props }) => (
              <table className="w-full border-collapse my-4" {...props} />
            ),
            th: ({ node, ...props }) => (
              <th className="border dark:border-gray-600 px-4 py-2 text-left bg-gray-50 dark:bg-gray-700" {...props} />
            ),
            td: ({ node, ...props }) => (
              <td className="border dark:border-gray-600 px-4 py-2" {...props} />
            ),
          }}
        >
          {post.content}
        </ReactMarkdown>
      </section>
    </article>
    // <article>
    //   <header>
    //     <h1>{post.title}</h1>
    //     <div>
    //       <span>By {post.author?.name || "Unknown author"}</span>
    //       <span> • </span>
    //       <span>
    //         {post.createdAt
    //           ? new Date(post.createdAt).toLocaleDateString()
    //           : "No date"}
    //       </span>
    //     </div>
    //   </header>
    //   {isAuthor && (
    //     <div>
    //       <Link to={`/posts/${post.slug}/edit`}>
    //         <button disabled={updating}>Edit</button>
    //       </Link>
    //       {!post.published ? (
    //         <button onClick={onPublish} disabled={updating}>
    //           {updating ? "Publishing..." : "Publish"}
    //         </button>
    //       ) : (
    //         <button onClick={onUnpublish} disabled={updating}>
    //           {updating ? "Unpublishing..." : "Unpublish"}
    //         </button>
    //       )}
    //       <button onClick={() => onDelete(post.id)}>
    //         Delete
    //       </button>
    //     </div>
    //   )}
    //   {/* <section>{renderContent(post.content)}</section> */}
    //   <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
    // </article>
  )
}

export default PostDetail
