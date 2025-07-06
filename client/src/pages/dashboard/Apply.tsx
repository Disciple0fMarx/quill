import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useApplication } from "../../hooks/useApplication"
import ApplicationForm from "../../components/dashboard/author_apps/ApplicationForm"
import StatusCard from "../../components/dashboard/author_apps/StatusCard"

const ApplyPage = () => {
    const [message, setMessage] = useState<string>('')
    const {
        submitApplication,
        isSubmitting,
        submissionError,
        isSubmitted,
        hasPendingApplications,
    } = useApplication()
    const navigate = useNavigate()

    const handleSubmit = (msg: string) => {
        setMessage(msg)
        submitApplication(msg)
    }

    if (hasPendingApplications || isSubmitted) return (
        <StatusCard 
            title="Application Submitted"
            message="Your author application is under review."
            actionLabel="Return Home"
            onAction={() => navigate('/')}
        />
    )

    return (
        <div>
            <h1>Become an Author</h1>
            <ApplicationForm
                onSubmit={() => handleSubmit(message)}
                isLoading={isSubmitting}
                error={submissionError}
            />
        </div>
    )
}

export default ApplyPage
