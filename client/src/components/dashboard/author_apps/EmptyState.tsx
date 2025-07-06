interface EmptyStateProps {
    title: string
    description: string
    actionLabel?: string
    onAction?: () => void
}

const EmptyState = ({ title, description, actionLabel, onAction }: EmptyStateProps) => (
    <div>
        <h3>{title}</h3>
        <p>{description}</p>
        {actionLabel && onAction && (
            <button onClick={onAction}>
                {actionLabel}
            </button>
        )}
    </div>
)

export default EmptyState
