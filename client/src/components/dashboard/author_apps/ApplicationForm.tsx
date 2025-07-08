import { useState } from "react"

interface ApplicationFormProps {
    onSubmit: (message: string) => void
    isLoading?: boolean
    error?: string | null
}

const ApplicationForm = ({ onSubmit, isLoading, error }: ApplicationFormProps) => {
    const [message, setMessage] = useState<string>('')

    return (
        <form 
            onSubmit={(e) => {
                e.preventDefault()
                onSubmit(message)
                setMessage('')
            }}
            className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md dark:bg-gray-800"
        >
            <div className="mb-6">
                <label htmlFor="message" className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">Why do you want to become an author?</label>
                <textarea
                    name="message"
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={'Share your motivation...'}
                    required
                    minLength={100}
                    rows={6}
                    className="w-full px-4 py-3 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                />
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Minimum 100 characters ({message.length}/100)</p>
            </div>

            {error && <div className="error mb-4 p-3 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-900 dark:text-red-100">{error}</div>}

            <button
                type="submit"
                disabled={isLoading || message.length < 100}
                className={`w-full px-5 py-3 text-white font-medium rounded-lg ${
                    isLoading || message.length < 100
                        ? 'bg-gray-400 cursor-not-allowed dark:bg-gray-600'
                        : 'bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800'
                } transition-colors`}
            >
                {isLoading ? 'Submitting...' : 'Submit Application'}
            </button>
        </form>
    )
}

export default ApplicationForm
