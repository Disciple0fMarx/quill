import type { AuthorApplication } from "../../../types"

interface ApplicationCardProps {
    app: AuthorApplication
    onApprove: () => void
    onReject: () => void
    isLoading?: boolean
}

const ApplicationCard = ({ app, onApprove, onReject, isLoading  }: ApplicationCardProps) =>  (
    <div>
        <div>
            <h3>{app.user?.name || app.user?.email}</h3>
            <p>{app.message}</p>
            <div>
                <span>Applied: {new Date(app.submittedAt).toLocaleString()}</span>
            </div>
        </div>

        <div>
            <button onClick={onApprove} disabled={isLoading}>Approve</button>
            <button onClick={onReject} disabled={isLoading}>Reject</button>
        </div>
    </div>
)

export default ApplicationCard
