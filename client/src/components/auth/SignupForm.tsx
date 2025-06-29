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
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="signup-name">Name</label>
        <input
          type="text"
          id='signup-name'
          name="signup-name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Name"
          required
        />
        {errors.name && <span>{errors.name}</span>}
      </div>
      <div>
        <label htmlFor="signup-email">Email</label>
        <input
          type="email"
          id="signup-email"
          name="signup-email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Email"
          required
        />
        {errors.email && <span>{errors.email}</span>}
      </div>
      <div>
        <label htmlFor="signup-password">
          Password{' '}
          <span title="Password must be between 8 and 30 characters long, contain at least one uppercase letter, one lowercase letter, one digit, and one special character">ℹ️</span>
        </label>
        <input
          type="password"
          id="signup-password"
          name="signup-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Password"
          required
        />
        {errors.password && <span>{errors.password}</span>}
      </div>
      <div>
        <label htmlFor="signup-repeat-password">Repeat Password</label>
        <input
          type="password"
          id="signup-repeat-password"
          name='signup-repeat-password'
          value={repeatPassword}
          onChange={(event) => setRepeatPassword(event.target.value)}
          placeholder="Repeat Password"
          required
        />
        {errors.repeatPassword && <span>{errors.repeatPassword}</span>}
      </div>
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Creating account...' : 'Sign Up'}
      </button>
    </form>
  )
}

export default SignupForm
