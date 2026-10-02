import { useEffect, useState } from "react";

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

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/release/${releaseId}/deployments`)
            .then(response => response.json())
            .then(data => setDeployments(data))
    }, [releaseId])

    return (
        <section>
            <h2>Deployments</h2>

            {deployments.length === 0 ? (
                <p>No deployments yet.</p>
            ) : (
                deployments.map(deployment => (
                    <article key={deployment.id}>
                        <p>{deployment.environment}</p>
                        <p>{deployment.deployed_at}</p>
                    </article>
                ))
            )}
        </section>
    )
}

export default DeploymentList