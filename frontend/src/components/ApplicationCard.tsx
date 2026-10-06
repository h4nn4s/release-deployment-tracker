type Application = {
    id: number
    name: string
    description: string | null
}

type ApplicationCardProps = {
    application: Application
    onSelect: (id: number) => void
}

function ApplicationCard({
    application,
    onSelect
}: ApplicationCardProps) {
    return (
        <button
            className="card"
            onClick={() => onSelect(application.id)}
        >
            <h3>{application.name}</h3>

            {application.description && (
                <p>{application.description}</p>
            )}

            <span>View releases →</span>
        </button>
    )
}

export default ApplicationCard