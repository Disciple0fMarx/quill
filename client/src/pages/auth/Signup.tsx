import { useState } from 'react'
import AuthLayout from '../../components/auth/AuthLayout'
import SignupForm from '../../components/auth/SignupForm'
import { useAuthContext } from '../../context/AuthContext'
// import { Link } from 'react-router-dom'
import logo from '../../assets/images/logo.png'

const Signup = () => {
    const { signup, isLoading } = useAuthContext()
  const [error, setError] = useState('')

  const handleSubmit = async (email: string, password: string, name: string) => {
    try {
      await signup(email, password, name)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Signup failed')
    }
  }

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col md:flex-row items-center justify-center px-6 py-8 mx-auto lg:py-0 min-h-screen overflow-auto">
        {/* <Link to="/" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          <img src={logo} alt="Quill Logo" className="w-32 h-32 mr-4" />
        </Link> */}
        <div className="md:w-1/2 flex justify-center mb-8 md:mb-0">
          <img 
              src={logo} 
              alt="Quill Logo" 
              className="w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80" 
            />
          {/* <Link to="/" className="flex items-center text-2xl font-semibold text-gray-900 dark:text-white">
            
          </Link> */}
        </div>
        <AuthLayout
          title="Create Account"
          footerText="Already have an account?"
          footerLink="/login"
          footerLinkText="Log in"
        >
          {error && <p className="auth-error">{error}</p>}
          <SignupForm onSubmit={handleSubmit} isLoading={isLoading} />
        </AuthLayout>
      </div>
    </section>
  )
}

export default Signup
