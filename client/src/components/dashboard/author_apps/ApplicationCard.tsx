import type { AuthorApplication } from "../../../types"

interface ApplicationCardProps {
    app: AuthorApplication
    onApprove: () => void
    onReject: () => void
    isLoading?: boolean
}

const ApplicationCard = ({ app, onApprove, onReject, isLoading  }: ApplicationCardProps) =>  (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md dark:shadow-gray-900/30 p-6 mb-6 border border-gray-100 dark:border-gray-700">
        <div className="mb-4">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-1">
                {app.user?.name || app.user?.email}
            </h3>
            
            <p className="text-gray-600 dark:text-gray-300 mb-4 whitespace-pre-line break-words">
                {app.message}
            </p>
            
            <div className="text-sm text-gray-500 dark:text-gray-400">
                <span>Applied: {new Date(app.submittedAt).toLocaleString()}</span>
            </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100 dark:border-gray-700">
            <button
                onClick={onReject}
                disabled={isLoading}
                className={`px-4 py-2 font-medium rounded-lg transition-colors ${
                    isLoading
                        ? 'bg-gray-300 text-gray-500 dark:bg-gray-600 dark:text-gray-300 cursor-not-allowed'
                        : 'bg-red-600 text-white hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800'
                }`}
            >
                Reject
            </button>
            
            <button
                onClick={onApprove}
                disabled={isLoading}
                className={`px-4 py-2 font-medium rounded-lg transition-colors ${
                    isLoading
                        ? 'bg-gray-300 text-gray-500 dark:bg-gray-600 dark:text-gray-300 cursor-not-allowed'
                        : 'bg-green-600 text-white hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800'
                }`}
            >
                Approve
            </button>
        </div>
    </div>
    // <div>
    //     <div>
    //         <h3>{app.user?.name || app.user?.email}</h3>
    //         <p>{app.message}</p>
    //         <div>
    //             <span>Applied: {new Date(app.submittedAt).toLocaleString()}</span>
    //         </div>
    //     </div>

    //     <div>
    //         <button onClick={onApprove} disabled={isLoading}>Approve</button>
    //         <button onClick={onReject} disabled={isLoading}>Reject</button>
    //     </div>
    // </div>
)

export default ApplicationCard
