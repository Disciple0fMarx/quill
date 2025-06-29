import { useState } from 'react'
import AuthLayout from '../../components/auth/AuthLayout'
import SignupForm from '../../components/auth/SignupForm'
import { useAuthContext } from '../../context/AuthContext'

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
    <AuthLayout
      title="Create Account"
      footerText="Already have an account?"
      footerLink="/login"
      footerLinkText="Log in"
    >
      {error && <p className="auth-error">{error}</p>}
      <SignupForm onSubmit={handleSubmit} isLoading={isLoading} />
    </AuthLayout>
  )
}

export default Signup
