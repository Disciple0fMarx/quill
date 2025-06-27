import { useState, useEffect } from 'react'
import axios from 'axios'

interface Post {
  id: number
  title: string
  content: string | null
}

function App() {
  const [posts, setPosts] = useState<Post[]>([])

  useEffect(() => {
    axios.get<Post[]>('http://localhost:3001/posts')
      .then(res => setPosts(res.data))
      .catch(err => console.log(err))
  }, [])

  return (
    <div>
      <h1>Quill</h1>
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.content || 'No content'}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
