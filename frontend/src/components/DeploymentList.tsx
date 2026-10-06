import { useEffect, useState } from "react"

type Deployment = {
    id: number
    release_id: number
    environment: string
    deployed_at: string
}

type DeploymentListProps = {
    releaseId: number
}

function DeploymentList({ releaseId }: DeploymentListProps) {
    const [deployments, setDeployments] = useState<Deployment[]>([])
    const [environment, setEnvironment] = useState("Development")
    const [error, setError] = useState<string | null>(null)

    const fetchDeployments = () => {
        fetch(`http://127.0.0.1:8000/api/release/${releaseId}/deployments`)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Failed to fetch deployments")
                }

                return response.json()
            })
            .then(data => setDeployments(data))
            .catch(() => setError("Could not load deployments"))
    }

    useEffect(() => {
        fetchDeployments()
    }, [releaseId])

    const deployRelease = () => {
        setError(null)

        fetch("http://127.0.0.1:8000/api/deployments", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                release_id: releaseId,
                environment: environment
            })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Failed to create deployment")
                }

                return response.json()
            })
            .then(() => {
                fetchDeployments()
            })
            .catch(() => setError("Could not create deployment"))
    }

    return (
        <section>
            <h2>Deployments</h2>

            {error && <p>{error}</p>}

            <select
                value={environment}
                onChange={event => setEnvironment(event.target.value)}
            >
                <option value="Development">Development</option>
                <option value="Testing">Testing</option>
                <option value="Staging">Staging</option>
                <option value="Production">Production</option>
            </select>

            <button onClick={deployRelease}>Deploy</button>

            {deployments.length === 0 ? (
                <p>No deployments yet.</p>
            ) : (
                deployments.map(deployment => (
                    <article className="deployment" key={deployment.id}>
                        <strong>{deployment.environment}</strong>
                        <span>{new Date(deployment.deployed_at).toLocaleString()}</span>
                    </article>
                ))
            )}
        </section>
    )
}

export default DeploymentList