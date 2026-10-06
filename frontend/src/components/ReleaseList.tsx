import { useEffect, useState } from "react"
import ReleaseForm from "./ReleaseForm"

type Release = {
    id: number
    application_id: number
    version: string
    description: string | null
    created_at: string
}

type ReleaseListProps = {
    applicationId: number
    onSelect: (id: number) => void
}

function ReleaseList({
    applicationId,
    onSelect
}: ReleaseListProps) {
    const [releases, setReleases] = useState<Release[]>([])
    const [error, setError] = useState<string | null>(null)

    const fetchReleases = () => {
        fetch(
            `http://127.0.0.1:8000/api/applications/${applicationId}/releases`
        )
            .then(response => {
                if (!response.ok) {
                    throw new Error("Failed to fetch releases")
                }

                return response.json()
            })
            .then(data => setReleases(data))
            .catch(() => setError("Could not load releases"))
    }

    useEffect(() => {
        fetchReleases()
    }, [applicationId])

    return (
        <section>
            <h2>Releases</h2>

            {error && <p>{error}</p>}

            {releases.map(release => (
                <button
                    className="card"
                    key={release.id}
                    onClick={() => onSelect(release.id)}
                >
                    <h3>{release.version}</h3>

                    {release.description && (
                        <p>{release.description}</p>
                    )}

                    <span>View deployments →</span>
                </button>
            ))}

            <ReleaseForm
                applicationId={applicationId}
                onCreated={fetchReleases}
            />
        </section>
    )
}

export default ReleaseList