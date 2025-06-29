const Footer = () => {
  return (
    <footer>
      <div>
        <span>© {new Date().getFullYear()} • Quill by {' '}
          <a 
            href="https://github.com/disciple0fMarx" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            Dhya El Bahri
          </a>
        </span>
      </div>
    </footer>
  )
}

export default Footer
