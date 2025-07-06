import { useState } from "react"

interface ApplicationFormProps {
    onSubmit: (message: string) => void
    isLoading?: boolean
    error?: string | null
}

const ApplicationForm = ({ onSubmit, isLoading, error }: ApplicationFormProps) => {
    const [message, setMessage] = useState<string>('')

    return (
        <form onSubmit={(e) => {
            e.preventDefault()
            onSubmit(message)
        }}>
            <div>
                <label htmlFor="message">Why do you want to become a writer?</label>
                <textarea
                    name="message"
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={'Share your motivation...'}
                    required
                    minLength={100}
                    rows={6}
                />
                <p>Minimum 100 characters</p>
            </div>

            {error && <div className="error">{error}</div>}

            <button
                type="submit"
                disabled={isLoading || message.length < 100}
            >
                {isLoading ? 'Submitting...' : 'Submit Application'}
            </button>
        </form>
    )
}

export default ApplicationForm
