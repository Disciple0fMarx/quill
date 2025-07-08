import { useState } from 'react'
import MarkdownEditor from '../../editor/MarkdownEditor'
import { useNavigate } from 'react-router-dom'
import { usePosts } from '../../../hooks/usePosts'

const CreatePostForm = () => {
  const [title, setTitle] = useState<string>('')
  const [markdown, setMarkdown] = useState<string>('# Hello World\n\nStart writing...')
  const { createPost, loading, error } = usePosts()
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

  const handleSubmit = async (shouldPublish: boolean) => {
    if (!isValidSlug(title)) {
      alert('Invalid title')
      return
    }
    try {
      const newPost = await createPost({ title, content: markdown, published: shouldPublish })

      if (shouldPublish) {
        navigate(`/posts/${newPost.slug}`)
      } else {
        navigate("/posts/user", {
          state: {
            message: "Draft saved successfully",
            type: "success",
          },
        })
      }
    } catch (err) {
      console.error('Submission failed: ', err)
    }

    console.log({ title, content: markdown })
  }

  return (
    <form onSubmit={(e) => e.preventDefault()} className="space-y-3">
      <div>
        <label htmlFor="new-post-title" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Title</label>
        <input
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-green-600 focus:border-green-600 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
          value={title}
          id="new-post-title"
          name="new-post-title"
          onChange={(e) => setTitle(e.target.value)}
          required
          disabled={loading}
        />
      </div>

      <div>
        <label htmlFor="new-post-content" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Content</label>
        <MarkdownEditor 
          id="new-post-content"
          name="new-post-content"
          value={markdown} 
          onChange={setMarkdown} 
          disabled={loading}
        />
      </div>

      {error && <span className="text-xs text-red-600 dark:text-red-400 mt-1 block">Error: {error}</span>}

      <div className="flex items-center justify-center">
        <button
          type="submit"
          onClick={() => handleSubmit(false)}
          disabled={loading || !title.trim() || !isValidSlug(title)}
          className={`px-5 py-2.5 mr-1 font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 ${
            loading || !title.trim() || !isValidSlug(title)
              ? 'bg-gray-400 text-gray-800 cursor-not-allowed dark:bg-gray-600 dark:text-gray-300'
              : 'bg-green-600 text-white hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800'
          }`}
        >
          {loading ? 'Saving...' : 'Save Draft'}
        </button>

        <button
          type="submit"
          onClick={() => handleSubmit(true)}
          disabled={loading || !title.trim() || !markdown.trim() || !isValidSlug(title)}
          className={`px-5 py-2.5 ml-1 font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 ${
            loading || !title.trim() || !markdown.trim() || !isValidSlug(title)
              ? 'bg-gray-400 text-gray-800 cursor-not-allowed dark:bg-gray-600 dark:text-gray-300'
              : 'bg-green-600 text-white hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800'
          }`}
        >
          {loading ? 'Publishing...' : 'Publish'}
        </button>

        {/* <button
          className="px-4 py-2 mr-2 mt-4 bg-green-600 dark:bg-green-700 text-white rounded hover:bg-green-700 dark:hover:bg-green-600 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
          type="submit"
          onClick={() => handleSubmit(false)}
          disabled={loading || !title.trim() || !isValidSlug(title)}
        >
          {loading ? 'Saving...' : 'Save Draft'}
        </button>

        <button
          className="px-4 py-2 ml-2 mt-4 bg-green-600 dark:bg-green-700 text-white rounded hover:bg-green-700 dark:hover:bg-green-600 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
          type="submit"
          onClick={() => handleSubmit(true)}
          disabled={loading || !title.trim() || !markdown.trim() || !isValidSlug(title)}
        >
          {loading ? 'Publishing...' : 'Publish'}
        </button> */}
      </div>
    </form>
  )
}

export default CreatePostForm
