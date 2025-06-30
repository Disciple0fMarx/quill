import { useState } from 'react'
import { validateEmail } from '../../utils/validation'

type LoginFormProps = {
  onSubmit: (email: string, password: string) => Promise<void>
  isLoading: boolean
}

const LoginForm = ({ onSubmit, isLoading }: LoginFormProps) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    const emailValidation = validateEmail(email)
    const passwordValidation = password.length >= 8 && password.length <= 30 ? { valid: true } : { valid: false, message: 'Password must be between 8 and 30 characters long' }

    setErrors({
      email: emailValidation.valid ? '' : emailValidation.message || '',
      password: passwordValidation.valid ? '' : passwordValidation.message || '',
    })

    if (emailValidation.valid && passwordValidation.valid)
      await onSubmit(email, password)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="login-email">Email</label>
        <input
          type="email"
          id="login-email"
          name="login-email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Email"
          required
        />
        {errors.email && <span>{errors.email}</span>}
      </div>
      <div>
        <label htmlFor="login-password">Password</label>
        <input
          type="password"
          id='login-password'
          name="login-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Password"
          required
        />
        {errors.password && <span>{errors.password}</span>}
      </div>
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Logging in...' : 'Log In'}
      </button>
    </form>
  )
}

export default LoginForm
