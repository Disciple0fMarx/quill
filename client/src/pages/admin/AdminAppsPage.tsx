import { useApplication } from "../../hooks/useApplication"
import ApplicationCard from "../../components/dashboard/author_apps/ApplicationCard"
import EmptyState from "../../components/dashboard/author_apps/EmptyState"
import LoadingSpinner from "../../components/ui/LoadingSpinner"

const AdminAppsPage = () => {
    const {
        pendingApplications,
        processApplication,
        isLoadingApps,
        processingError,
        refetchApplications,
    } = useApplication()

    return (
        <div className="max-w-4xl mx-auto px-4 py-8 mt-11">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                    Author Applications
                </h1>
                <button
                    onClick={refetchApplications}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-300"
                >
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-5 w-5" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                    >
                        <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" 
                        />
                    </svg>
                    Refresh
                </button>
            </div>

            {processingError && (
                <div className="mb-6 p-4 text-red-700 bg-red-100 rounded-lg dark:bg-red-900/30 dark:text-red-100">
                    {processingError}
                </div>
            )}

            {isLoadingApps ? (
                <LoadingSpinner size='md' center />
            ) : pendingApplications.length === 0 ? (
                <EmptyState
                    title="No pending applications"
                    description="There are currently no author applications to review."
                />
            ) : (
                <div className="space-y-6">
                    {pendingApplications.map(app => (
                        <ApplicationCard
                            key={app.id}
                            app={app}
                            onApprove={() => processApplication(app.id, 'APPROVED', app.userId)}
                            onReject={() => processApplication(app.id, 'REJECTED', app.userId)}
                            isLoading={isLoadingApps}
                        />
                    ))}
                </div>
            )}
        </div>
        // <div>
        //     <div>
        //         <h1>Author Applications</h1>
        //         <button onClick={refetchApplications}>Refresh</button>
        //     </div>

        //     {processingError && <div className="error">{processingError}</div>}

        //     {isLoadingApps ? (
        //         // <div>Loading...</div>
        //         <LoadingSpinner size='md' center />
        //     ) : pendingApplications.length === 0 ? (
        //         <EmptyState
        //             title="No pending applications"
        //             description="There are currently no author applications to review."
        //         />
        //     ) : (
        //         <div>
        //             {pendingApplications.map(app => (
        //                 <ApplicationCard
        //                     key={app.id}
        //                     app={app}
        //                     onApprove={() => processApplication(app.id, 'APPROVED', app.userId)}
        //                     onReject={() => processApplication(app.id, 'REJECTED', app.userId)}
        //                     isLoading={isLoadingApps}
        //                 />
        //             ))}
        //         </div>
        //     )}
        // </div>
    )
}

export default AdminAppsPage
