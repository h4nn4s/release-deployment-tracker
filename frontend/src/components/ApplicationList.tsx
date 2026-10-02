import { useEffect, useState } from "react"
import ApplicationCard from "./ApplicationCard"

///hur datan från api ska se ut
type Application = {
    id: number
    name: string
    description: string | null
    created_at: string
}

function ApplicationList() {
    /// frontend lagrar applications från api
    const [applications, setApplications] = useState<Application[]>([])


    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/applications")
            .then(response => response.json())
            .then(data => setApplications(data))
    }, [])

    return (
        <section>
            <h2>Applications</h2>

            {applications.map(application => (
                <ApplicationCard
                    key={application.id}
                    application={application}
                />
            ))}
        </section>
    )
}

export default ApplicationList