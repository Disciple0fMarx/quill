interface EmptyStateProps {
    title: string
    description: string
    actionLabel?: string
    onAction?: () => void
}

const EmptyState = ({ title, description, actionLabel, onAction }: EmptyStateProps) => (
    <div className="text-center py-12 px-6 max-w-md mx-auto">
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-gray-100 dark:bg-gray-700 mb-4">
            <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-6 w-6 text-gray-400 dark:text-gray-300" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
            >
                <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                />
            </svg>
        </div>
        
        <h3 className="text-xl font-medium text-gray-800 dark:text-gray-100 mb-2">
            {title}
        </h3>
        
        <p className="text-gray-500 dark:text-gray-400 mb-6">
            {description}
        </p>
        
        {actionLabel && onAction && (
            <button
                onClick={onAction}
                className="px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
            >
                {actionLabel}
            </button>
        )}
    </div>
    // <div>
    //     <h3>{title}</h3>
    //     <p>{description}</p>
    //     {actionLabel && onAction && (
    //         <button onClick={onAction}>
    //             {actionLabel}
    //         </button>
    //     )}
    // </div>
)

export default EmptyState
