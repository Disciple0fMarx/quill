import { Link } from "react-router-dom"
import { usePosts } from "../hooks/usePosts"
import Post from "../components/dashboard/posts/Post"
import { useEffect } from "react"

const Home = () => {
    const { posts, loading, fetchPosts } = usePosts()

    useEffect(() => {
        fetchPosts(1, 3)
    }, [])

    return (
        <div className="home">
            <section>
                <h1>Quill: Your Voice, Unfiltered.</h1>
                <p>Join a community where your thoughts flow freely. Read diverse perspectives or share your own without censorship.</p>
                <div>
                    <Link to="/signup">Join as a Reader</Link>
                    <Link to="#recent-posts">Discover Stories</Link>
                </div>
            </section>
            <section>
                <h2>Unfiltered. Unbiased. Community-Driven.</h2>
                <p>Quill empowers authentic voices with no algorithm or gatekeeping.</p>
                <a href="https://github.com/Disciple0fMarx/quill" target="_blank" rel="noopener noreferrer">
                    Explore on GitHub
                </a>
            </section>
            <section id="recent-posts">
                <h2>Recent Writings</h2>
                {loading ? (
                    <div>Loading posts...</div>
                ) : (
                    <div>
                        {posts.map(post => (
                            <Post 
                                key={post.id}
                                id={post.id}
                                title={post.title}
                                slug={post.slug}
                                author={post.author}
                                createdAt={post.createdAt}
                            />
                        ))}
                    </div>
                )}
            </section>
        </div>
    )
}

export default Home