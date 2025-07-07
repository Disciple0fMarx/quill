import { useState } from 'react'
import { validateEmail, validatePassword, validateName, validatePasswordsMatch, formatName } from '../../utils/validation'

type SignupFormProps = {
  onSubmit: (email: string, password: string, name: string) => Promise<void>
  isLoading: boolean
}

const SignupForm = ({ onSubmit, isLoading }: SignupFormProps) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')
  const [name, setName] = useState('')

  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    const formattedName = formatName(name)

    const emailValidation = validateEmail(email)
    const passwordValidation = validatePassword(password)
    const passwordsMatch = validatePasswordsMatch(password, repeatPassword)
    const nameValidation = validateName(formattedName)

    setErrors({
      email: emailValidation.valid ? '' : emailValidation.message || '',
      password: passwordValidation.valid ? '' : passwordValidation.message || '',
      repeatPassword: passwordsMatch.valid ? '' : passwordsMatch.message || '',
      name: nameValidation.valid ? '' : nameValidation.message || '',
    })

    if (emailValidation.valid && passwordValidation.valid && nameValidation.valid)
      await onSubmit(email, password, formattedName)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-3"
    >
      <div>
        <label htmlFor="signup-name" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Name</label>
        <input
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-green-600 focus:border-green-600 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
          type="text"
          id='signup-name'
          name="signup-name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Name"
          required
        />
        {errors.name && <span className="text-xs text-red-600 dark:text-red-400 mt-1 block">{errors.name}</span>}
      </div>
      <div>
        <label htmlFor="signup-email" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Email</label>
        <input
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-green-600 focus:border-green-600 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
          type="email"
          id="signup-email"
          name="signup-email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Email"
          required
        />
        {errors.email && <span className="text-xs text-red-600 dark:text-red-400 mt-1 block">{errors.email}</span>}
      </div>
      <div>
        <label htmlFor="signup-password" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
          Password{' '}
          <span title="Password must be between 8 and 30 characters long, contain at least one uppercase letter, one lowercase letter, one digit, and one special character">ℹ️</span>
        </label>
        <input
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-green-600 focus:border-green-600 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          type="password"
          id="signup-password"
          name="signup-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Password"
          required
        />
        {errors.password && <span className="text-xs text-red-600 dark:text-red-400 mt-1 block">{errors.password}</span>}
      </div>
      <div>
        <label htmlFor="signup-repeat-password" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Repeat Password</label>
        <input
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-green-600 focus:border-green-600 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
          type="password"
          id="signup-repeat-password"
          name='signup-repeat-password'
          value={repeatPassword}
          onChange={(event) => setRepeatPassword(event.target.value)}
          placeholder="Repeat Password"
          required
        />
        {errors.repeatPassword && <span className="text-xs text-red-600 dark:text-red-400 mt-1 block">{errors.repeatPassword}</span>}
      </div>
      <button 
        type="submit"
        disabled={isLoading}
        className="mt-3 w-full text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
      >
        {isLoading ? 'Creating account...' : 'Sign Up'}
      </button>
    </form>
  )
}

export default SignupForm
