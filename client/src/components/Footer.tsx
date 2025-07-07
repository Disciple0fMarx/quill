const Footer = () => {
  return (
    <footer className="bg-white shadow-sm dark:bg-gray-900 w-full">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© {new Date().getFullYear()} • Quill by {' '}
          <a 
            href="https://github.com/disciple0fMarx" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:underline"
          >
            Dhya El Bahri
          </a>
        </span>
      </div>
    </footer>
  )
}

export default Footer
