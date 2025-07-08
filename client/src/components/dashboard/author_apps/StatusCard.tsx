interface StatusCardProps {
    title: string
    message: string
    actionLabel?: string
    onAction?: () => void
}

const StatusCard = ({ title, message, actionLabel, onAction }: StatusCardProps) => (
    // <div>
    //     <h2>{title}</h2>
    //     <p>{message}</p>
    //     {actionLabel && onAction && (
    //         <button onClick={onAction}>
    //             {actionLabel}
    //         </button>
    //     )}
    // </div>
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md dark:shadow-gray-900/30 p-8 text-center max-w-md mx-auto">
        <div className="mb-6 flex justify-center">
            <div className="bg-green-100 dark:bg-green-900/30 p-4 rounded-full">
                <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-8 w-8 text-green-600 dark:text-green-400" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                >
                    <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" 
                    />
                </svg>
            </div>
        </div>
        
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-3">
            {title}
        </h2>
        
        <p className="text-gray-600 dark:text-gray-300 mb-6">
            {message}
        </p>
        
        {actionLabel && onAction && (
            <button
                onClick={onAction}
                className="px-6 py-2.5 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
            >
                {actionLabel}
            </button>
        )}
    </div>
)

export default StatusCard
