import { useState } from "react"

type ReleaseFormProps = {
    applicationId: number
    onCreated: () => void
}

function ReleaseForm({
    applicationId,
    onCreated
}: ReleaseFormProps) {
    const [version, setVersion] = useState("")
    const [description, setDescription] = useState("")
    const [error, setError] = useState<string | null>(null)

    const createRelease = (event: React.FormEvent) => {
        event.preventDefault()
        setError(null)

        fetch("http://127.0.0.1:8000/api/releases", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                application_id: applicationId,
                version,
                description: description || null
            })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Failed to create release")
                }

                return response.json()
            })
            .then(() => {
                setVersion("")
                setDescription("")
                onCreated()
            })
            .catch(() => {
                setError("Could not create release")
            })
    }

    return (
        <form className="form" onSubmit={createRelease}>
            <h3>New release</h3>

            <input
                type="text"
                placeholder="Version"
                value={version}
                onChange={event => setVersion(event.target.value)}
                required
            />

            <input
                type="text"
                placeholder="Description"
                value={description}
                onChange={event => setDescription(event.target.value)}
            />

            <button type="submit">Create</button>

            {error && <p>{error}</p>}
        </form>
    )
}

export default ReleaseForm