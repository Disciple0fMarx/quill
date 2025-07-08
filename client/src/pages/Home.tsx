import { Link } from "react-router-dom"
import { usePosts } from "../hooks/usePosts"
import Post from "../components/dashboard/posts/Post"
import { useEffect } from "react"
import LoadingSpinner from "../components/ui/LoadingSpinner"

const Home = () => {
    const { posts, loading, fetchPosts } = usePosts()

    useEffect(() => {
        fetchPosts(1, 3)
    }, [])

    return (
        <div className="home">
            <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900 dark:to-green-950 px-4 py-16">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-5xl md:text-6xl font-bold text-green-800 dark:text-green-100 mb-6">
                        Quill: Where Authentic Voices Thrive.
                    </h1>
                    <p className="text-xl text-green-700 dark:text-green-300 mb-8">
                        Join a community of thinkers, writers and curious minds. 
                        Share your unfiltered perspectives or discover fresh ideas - 
                        no algorithms, no censorship, just genuine human connection.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link
                            to="/signup"
                            className="bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-lg transition duration-200"
                        >
                            Start Your Journey
                        </Link>
                        <a
                            href="#recent-posts"
                            className="border-2 border-green-600 dark:border-green-500 text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900 font-semibold px-6 py-3 rounded-lg transition duration-200"
                        >
                            Explore Writings
                        </a>
                    </div>
                </div>
            </section>
            <section className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-800 px-4 py-16">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl font-bold text-green-800 dark:text-green-200 mb-6">
                        Designed for Thoughtful Discourse
                    </h2>
                    <p className="text-xl text-gray-700 dark:text-gray-300 mb-8">
                        In a world of clickbait and echo chambers, Quill offers a sanctuary 
                        for meaningful exchange. Our community-driven platform ensures 
                        diverse voices are heard and valued.
                    </p>
                    <a
                        href="https://github.com/Disciple0fMarx/quill"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-gray-800 hover:bg-gray-900 dark:bg-gray-700 dark:hover:bg-gray-600 text-white font-semibold px-6 py-3 rounded-lg transition duration-200"
                    >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                        </svg>
                        Explore on GitHub
                    </a>
                </div>
            </section>
            <section id="recent-posts" className="min-h-screen flex items-center justify-center bg-green-50 dark:bg-green-950 px-4 py-16">
                <div className="max-w-7xl mx-auto w-full">
                    <h2 className="text-4xl font-bold text-green-800 dark:text-green-200 mb-12 text-center">Fresh Perspectives from Our Community</h2>
                    <p className="text-xl text-green-700 dark:text-green-300 mb-12 text-center max-w-3xl mx-auto">
                        Discover thought-provoking content from writers who value depth over clicks
                    </p>
                    {loading ? (
                        <LoadingSpinner size='md' center />
                        // <div>Loading posts...</div>
                    ) : (
                        <div className="flex flex-col md:flex-row gap-8 justify-center items-stretch">
                            {posts.map(post => (
                                <div key={post.id} className="flex-1 max-w-md md:max-w-none">
                                    <Post 
                                        key={post.id}
                                        id={post.id}
                                        title={post.title}
                                        slug={post.slug || ''}
                                        author={post.author}
                                        createdAt={post.createdAt}
                                    />
                                </div>
                                
                            ))}
                        </div>
                    )}
                </div>
            </section>
            <section className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900 px-4 py-16">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-4xl font-bold text-green-800 dark:text-green-200 mb-12 text-center">
                        Why Choose Quill?
                    </h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-md">
                            <div className="text-green-600 dark:text-green-400 mb-4">
                                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">Authentic Conversations</h3>
                            <p className="text-gray-600 dark:text-gray-300">
                                Engage in real discussions without algorithmic manipulation. 
                                Our chronological feed ensures you see what matters, when it matters.
                            </p>
                        </div>
                        
                        <div className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-md">
                            <div className="text-green-600 dark:text-green-400 mb-4">
                                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">Privacy Focused</h3>
                            <p className="text-gray-600 dark:text-gray-300">
                                We value your data as much as your words. 
                                No tracking, no ads - just a clean space for your thoughts.
                            </p>
                        </div>
                        
                        <div className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-md">
                            <div className="text-green-600 dark:text-green-400 mb-4">
                                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">Community Driven</h3>
                            <p className="text-gray-600 dark:text-gray-300">
                                Help shape Quill's future through open discussions and 
                                transparent development. Your voice matters in our decisions.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Home