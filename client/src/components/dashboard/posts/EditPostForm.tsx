import { useState, useEffect } from 'react'
import MarkdownEditor from '../../editor/MarkdownEditor'
import { useNavigate, useParams } from 'react-router-dom'
import { usePost } from '../../../hooks/usePosts'

const EditPostForm = () => {
  const { slug } = useParams<{ slug: string }>()
  const [title, setTitle] = useState<string>('')
  const [markdown, setMarkdown] = useState<string>('')
  const [isLoadingPost, setIsLoadingPost] = useState<boolean>(true)
  const { post, fetchPost, updatePost, fetching, updating, error } = usePost(slug || '')
  const navigate = useNavigate()

  const generateSlug = (title: string): string => {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '') // Remove non-word characters
      .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with hyphens
      .replace(/^-+|-+$/g, '')  // Remove leading/trailing hyphens
  }

  const isValidSlug = (title: string): boolean => {
    const slug = generateSlug(title)
    return slug.length > 0
  }

  useEffect(() => {
    const loadPost = async () => {
      if (slug) {
        try {
          await fetchPost()
        } catch (err) {
          console.error('Failed to fetch post:', err)
        } finally {
          setIsLoadingPost(false)
        }
      }
    }
    loadPost()
  }, [slug, fetchPost])

  useEffect(() => {
    if (post) {
      setTitle(post.title)
      setMarkdown(post.content)
    } else {
      console.error('Post not found')
    }
  }, [post])

  const handleSubmit = async (shouldPublish: boolean) => {
    if (!isValidSlug(title)) {
      alert('Invalid title')
      return
    }
    try {
      await updatePost({ title, content: markdown, published: shouldPublish })

      if (shouldPublish) {
        navigate(`/posts/${slug}`, {
          state: { message: 'Post published successfully', type: 'success' },
        })
      } else {
        navigate('/posts/user', {
          state: { message: 'Draft updated successfully', type: 'success' },
        })
      }
    } catch (err) {
      console.error('Update failed:', err)
    }
  }

  return (
    <div>
      {isLoadingPost ? (
        <div /** className="text-center" */>Loading post...</div>
      ) : (
        <form
          onSubmit={(e) => e.preventDefault()}
        //   className="space-y-6"
          aria-label="Edit post form"
        >
          <div>
            <label
              htmlFor="edit-post-title"
            //   className="block text-sm font-medium text-gray-700"
            >
              Title
            </label>
            <input
              value={title}
              id="edit-post-title"
              name="edit-post-title"
              onChange={(e) => setTitle(e.target.value)}
              required
              disabled={fetching || isLoadingPost}
            //   className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50"
              placeholder="Enter post title"
              aria-required="true"
            />
          </div>

          <div>
            <label
              htmlFor="edit-post-content"
            //   className="block text-sm font-medium text-gray-700"
            >
              Content
            </label>
            <MarkdownEditor
              id="edit-post-content"
              name="edit-post-content"
              value={markdown}
              onChange={setMarkdown}
              disabled={fetching || isLoadingPost}
            //   className="min-h-[300px] border border-gray-300 rounded-md"
              aria-required="true"
            />
          </div>

          {error && (
            <div
            //   className="text-red-600 bg-red-50 p-3 rounded-md"
              role="alert"
            >
              Error: {error}
            </div>
          )}

          <div>
            <button
              type="submit"
              onClick={() => handleSubmit(false)}
              disabled={updating || isLoadingPost || !title.trim() || !isValidSlug(title)}
            //   className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Save as draft"
            >
              {updating ? 'Saving...' : 'Save Draft'}
            </button>
            <button
              type="submit"
              onClick={() => handleSubmit(true)}
              disabled={updating || isLoadingPost || !title.trim() || !markdown.trim() || !isValidSlug(title)}
            //   className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Publish post"
            >
              {updating ? 'Publishing...' : 'Publish'}
            </button>
          </div>
        </form>
      )}
    </div>
  )
}

export default EditPostForm
