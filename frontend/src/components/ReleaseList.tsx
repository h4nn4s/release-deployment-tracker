import { useEffect, useState } from "react"

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

function ReleaseList({ applicationId, onSelect }: ReleaseListProps) {
    const [releases, setReleases] = useState<Release[]>([])

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/applications/${applicationId}/releases`)
            .then(response => response.json())
            .then(data => setReleases(data))
    }, [applicationId])

    return (
        <section>
            <h2>Releases</h2>

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
        </section>
    )

}

export default ReleaseList