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
    <form onSubmit={(e) => e.preventDefault()}>
      <div>
        <label htmlFor="new-post-title">Title</label>
        <input
          value={title}
          id="new-post-title"
          name="new-post-title"
          onChange={(e) => setTitle(e.target.value)}
          required
          disabled={loading}
        />
      </div>

      <div>
        <label htmlFor="new-post-content">Content</label>
        <MarkdownEditor 
          id="new-post-content"
          name="new-post-content"
          value={markdown} 
          onChange={setMarkdown} 
          disabled={loading}
        />
      </div>

      {error && <div>Error: {error}</div>}

      <div>
        <button
          type="submit"
          onClick={() => handleSubmit(false)}
          disabled={loading || !title.trim() || !isValidSlug(title)}
        >
          {loading ? 'Saving...' : 'Save Draft'}
        </button>

        <button
          type="submit"
          onClick={() => handleSubmit(true)}
          disabled={loading || !title.trim() || !markdown.trim() || !isValidSlug(title)}
        >
          {loading ? 'Publishing...' : 'Publish'}
        </button>
      </div>
    </form>
  )
}

export default CreatePostForm
