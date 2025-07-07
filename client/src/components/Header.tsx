// src/components/layout/Header.tsx
import { Link } from 'react-router-dom'
import { useAuthContext } from '../context/AuthContext'
import logoCrop from '../assets/images/logoCrop.png'
import { useState } from 'react'

const Header = () => {
  const { user, logout } = useAuthContext()
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  return (
    <header className="fixed w-full top-0 z-50">
      {/* Navigation */}
      <nav className="backdrop-blur-sm bg-white/60 border-gray-200/30 dark:bg-gray-900/60 dark:border-gray-700/30 border-b">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link to="/">
            <img src={logoCrop} alt="Quill Logo" className="h-16" />
          </Link>
          <button 
            onClick={toggleMenu}
            data-collapse-toggle="navbar-default" 
            type="button" 
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" 
            aria-controls="navbar-default" 
            aria-expanded={isMenuOpen}
          >
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
            </svg>
          </button>
          <div className={`${isMenuOpen ? 'block' : 'hidden'} w-full md:block md:w-auto`} id="navbar-default">
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0">
              {user ? (
                <>  
                  <li>
                    <Link 
                      to="/" 
                      className="block py-2 px-3 text-white bg-green-700 rounded-sm md:bg-transparent md:text-green-700 md:p-0 dark:text-white md:dark:text-green-500" 
                      aria-current="page"
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/profile" 
                      className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-700 md:p-0 dark:text-white md:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                    >
                      Profile
                    </Link>
                  </li>
                  {user.role === 'READER' && (
                    <li>
                      <Link 
                        to="/apply" 
                        className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-700 md:p-0 dark:text-white md:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                      >
                        Become an Author
                      </Link>
                    </li>
                  )}
                  {user.role === 'ADMIN' && (
                    <li>
                      <Link 
                        to="/admin/applications" 
                        className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-700 md:p-0 dark:text-white md:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                      >
                        Author Applications
                      </Link>
                    </li>
                  )}
                  <li>
                    <button 
                      onClick={logout} 
                      className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-700 md:p-0 dark:text-white md:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                    >
                      Log Out
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link 
                      to="/login" 
                      className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-700 md:p-0 dark:text-white md:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                    >
                      Log In
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/signup" 
                      className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-700 md:p-0 dark:text-white md:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                    >
                      Sign Up
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
        {/* {user ? (
          <>
            <Link to="/">Home</Link>
            <Link to="/profile">Profile</Link>
            {user.role === 'READER' && (
              <Link to="/apply">Become an Author</Link>
            )}
            {user.role === 'ADMIN' && (
              <Link to="/admin/applications">Author Applications</Link>
            )}
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </>
        )} */}
      </nav>
    </header>
  )
}

export default Header
