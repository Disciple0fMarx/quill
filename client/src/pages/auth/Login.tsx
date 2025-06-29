import { useState } from 'react'
import AuthLayout from '../../components/auth/AuthLayout'
import LoginForm from '../../components/auth/LoginForm'
import { useAuthContext } from '../../context/AuthContext'

const Login = () => {
    const { login, isLoading } = useAuthContext()
  const [error, setError] = useState('')

  const handleSubmit = async (email: string, password: string) => {
    try {
      await login(email, password)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed')
    }
  }

  return (
    <AuthLayout
      title="Login"
      footerText="Don't have an account?"
      footerLink="/signup"
      footerLinkText="Sign up"
    >
      {error && <p className="auth-error">{error}</p>}
      <LoginForm onSubmit={handleSubmit} isLoading={isLoading} />
    </AuthLayout>
  )
}

export default Login
