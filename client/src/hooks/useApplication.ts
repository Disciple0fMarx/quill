import { useCallback, useEffect, useState } from "react"
import { useAuthContext } from "../context/AuthContext"
import type { AuthorApplication } from "../types"
import { getPendingApplications } from "../api/author_applications/getPendingApplications"
import { submitApplication as apiSubmitApplication } from "../api/author_applications/submitApplication"
import { processApplication as apiProcessApplication } from "../api/author_applications/processApplication"

interface UseApplicationReturn {
    submitApplication: (message: string) => Promise<void>
    isSubmitting: boolean
    submissionError: string | null
    isSubmitted: boolean

    // Admin functions
    pendingApplications: AuthorApplication[]
    processApplication: (id: string, action: 'APPROVED' | 'REJECTED', userId: string) => Promise<void>
    isLoadingApps: boolean
    processingError: string | null

    // Status checks
    hasPendingApplications: boolean
    refetchApplications: () => Promise<void>
}

interface ApplicationState {
  isSubmitting: boolean
  submissionError: string | null
  isSubmitted: boolean
  pendingApplications: AuthorApplication[]
  isLoadingApps: boolean
  processingError: string | null
}

export const useApplication = (): UseApplicationReturn => {
    const { user } = useAuthContext()
    const [state, setState] = useState<ApplicationState>({
        isSubmitting: false,
        submissionError: null as string | null,
        isSubmitted: false,
        pendingApplications: [] as AuthorApplication[],
        isLoadingApps: false,
        processingError: null as string | null,
    })

    const hasPendingApplication = user?.role === 'READER' && state.pendingApplications?.some(app => app.userId === user.id)

    const fetchPendingApplications = useCallback(async () => {
        if (user?.role !== 'ADMIN') return

        setState(prev => ({...prev, isLoadingApps: true}))
        try {
            const apps = await getPendingApplications()
            setState(prev => ({...prev, pendingApplications: apps, isLoadingApps: false}))
        } catch (err) {
            setState(prev => ({...prev, isLoadingApps: false, processingError: err instanceof Error ? err.message : 'Failed to fetch pending applications'}))
        }
    }, [user?.role])

    // Initial load and refetch function
    useEffect(() => {
        fetchPendingApplications()
    }, [fetchPendingApplications])

    const refetchApplications = useCallback(async () => {
        await fetchPendingApplications()
    }, [fetchPendingApplications])

    const submitApplication = useCallback(async (message: string) => {
        if (user?.role !== 'READER') return

        setState(prev => ({...prev, isSubmitting: true, submissionError: null}))
        try {
            await apiSubmitApplication(message)
            setState(prev => ({...prev, isSubmitting: false, isSubmitted: true}))
        } catch (err) {
            setState(prev => ({...prev, isSubmitting: false, submissionError: err instanceof Error ? err.message : 'Failed to submit application'}))
        }
    }, [user?.role])

    const processApplication = useCallback(async (
        id: string,
        action: 'APPROVED' | 'REJECTED',
        userId: string,
    ) => {
        if (user?.role !== 'ADMIN') return

        setState(prev => ({...prev, processingError: null}))
        try {
            await apiProcessApplication(id, action, userId)
            setState(prev => ({
                ...prev,
                pendingApplications: prev.pendingApplications.filter(app => app.id !== id),
            }))
        } catch (err) {
            setState(prev => ({...prev, processingError: err instanceof Error ? err.message : 'Failed to process application'}))
        }
    }, [user?.role])

    return {
        // Submission-related
        submitApplication,
        isSubmitting: state.isSubmitting,
        submissionError: state.submissionError,
        isSubmitted: state.isSubmitted,

        // Admin-related
        pendingApplications: state.pendingApplications,
        processApplication,
        isLoadingApps: state.isLoadingApps,
        processingError: state.processingError,

        // Status checks
        hasPendingApplications: hasPendingApplication,
        refetchApplications,
    }
}
