import { useEffect, useState } from "react"
import ApplicationCard from "./ApplicationCard"
import ApplicationForm from "./ApplicationForm"

type Application = {
    id: number
    name: string
    description: string | null
    created_at: string
}

type ApplicationListProps = {
    onSelect: (id: number) => void
}

function ApplicationList({ onSelect }: ApplicationListProps) {
    const [applications, setApplications] = useState<Application[]>([])
    const [error, setError] = useState<string | null>(null)

    const fetchApplications = () => {
        fetch("http://127.0.0.1:8000/api/applications")
            .then(response => {
                if (!response.ok) {
                    throw new Error("Failed to fetch applications")
                }

                return response.json()
            })
            .then(data => setApplications(data))
            .catch(() => setError("Could not load applications"))
    }

    useEffect(() => {
        fetchApplications()
    }, [])

    return (
        <section>
            <h2>Applications</h2>

            {error && <p>{error}</p>}

            {applications.map(application => (
                <ApplicationCard
                    key={application.id}
                    application={application}
                    onSelect={onSelect}
                />
            ))}

            <ApplicationForm onCreated={fetchApplications} />
        </section>
    )
}

export default ApplicationList