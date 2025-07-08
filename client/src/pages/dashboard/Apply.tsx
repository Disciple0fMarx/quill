import { useNavigate } from "react-router-dom"
import { useApplication } from "../../hooks/useApplication"
import ApplicationForm from "../../components/dashboard/author_apps/ApplicationForm"
import StatusCard from "../../components/dashboard/author_apps/StatusCard"

const ApplyPage = () => {
    const {
        submitApplication,
        isSubmitting,
        submissionError,
        isSubmitted,
        hasPendingApplications,
    } = useApplication()
    const navigate = useNavigate()

    const handleSubmit = (msg: string) => {
        console.log('Message: ', msg)
        submitApplication(msg)
    }

    if (hasPendingApplications || isSubmitted) return (
        <div className="min-h-screen flex flex-col items-center justify-center w-full">
            <StatusCard 
                title="Application Submitted"
                message="Your author application is under review."
                actionLabel="Return Home"
                onAction={() => navigate('/')}
            />
        </div>
    )

    return (
        <div className="min-h-screen flex flex-col items-center justify-center w-full">
            <div className="w-full max-w-4xl mx-auto px-4">
                <ApplicationForm
                    onSubmit={handleSubmit}
                    isLoading={isSubmitting}
                    error={submissionError}
                />
            </div>
        </div>
    )
}

export default ApplyPage
