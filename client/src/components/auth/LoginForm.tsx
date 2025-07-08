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
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <label htmlFor="login-email" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Email</label>
        <input
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-green-600 focus:border-green-600 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
          type="email"
          id="login-email"
          name="login-email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Email"
          required
        />
        {errors.email && <span className="text-xs text-red-600 dark:text-red-400 mt-1 block">{errors.email}</span>}
      </div>
      <div>
        <label htmlFor="login-password" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Password</label>
        <input
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-green-600 focus:border-green-600 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
          type="password"
          id='login-password'
          name="login-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Password"
          required
        />
        {errors.password && <span className="text-xs text-red-600 dark:text-red-400 mt-1 block">{errors.password}</span>}
      </div>
      <button type="submit" disabled={isLoading} className="mt-3 w-full text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 cursor-pointer">
        {isLoading ? 'Logging in...' : 'Log In'}
      </button>
    </form>
  )
}

export default LoginForm
