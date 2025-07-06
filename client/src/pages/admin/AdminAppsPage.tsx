import { useApplication } from "../../hooks/useApplication"
import ApplicationCard from "../../components/dashboard/author_apps/ApplicationCard"
import EmptyState from "../../components/dashboard/author_apps/EmptyState"

const AdminAppsPage = () => {
    const {
        pendingApplications,
        processApplication,
        isLoadingApps,
        processingError,
        refetchApplications,
    } = useApplication()

    return (
        <div>
            <div>
                <h1>Author Applications</h1>
                <button onClick={refetchApplications}>Refresh</button>
            </div>

            {processingError && <div className="error">{processingError}</div>}

            {isLoadingApps ? (
                <div>Loading...</div>
            ) : pendingApplications.length === 0 ? (
                <EmptyState
                    title="No pending applications"
                    description="There are currently no author applications to review."
                />
            ) : (
                <div>
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
    )
}

export default AdminAppsPage
