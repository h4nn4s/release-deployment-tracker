type Application = {
    id: number
    name: string
    description: string | null
}

type ApplicationCardProps = {
    application: Application
}

function ApplicationCard({ application }: ApplicationCardProps) {
    return (
        <article>
            <h3>{application.name}</h3>
            <p>{application.description}</p>

        </article>
    )
}

export default ApplicationCard