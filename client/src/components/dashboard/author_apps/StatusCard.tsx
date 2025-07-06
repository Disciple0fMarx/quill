interface StatusCardProps {
    title: string
    message: string
    actionLabel?: string
    onAction?: () => void
}

const StatusCard = ({ title, message, actionLabel, onAction }: StatusCardProps) => (
    <div>
        <h2>{title}</h2>
        <p>{message}</p>
        {actionLabel && onAction && (
            <button onClick={onAction}>
                {actionLabel}
            </button>
        )}
    </div>
)

export default StatusCard
