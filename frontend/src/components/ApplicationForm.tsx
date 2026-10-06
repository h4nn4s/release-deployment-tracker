import { useState } from "react"

type ApplicationFormProps = {
    onCreated: () => void
}

function ApplicationForm({ onCreated }: ApplicationFormProps) {
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [error, setError] = useState<string | null>(null)

    const createApplication = (event: React.FormEvent) => {
        event.preventDefault()
        setError(null)

        fetch("http://127.0.0.1:8000/api/applications", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                description: description || null
            })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Failed to create application")
                }

                return response.json()
            })
            .then(() => {
                setName("")
                setDescription("")
                onCreated()
            })
            .catch(() => {
                setError("Could not create application")
            })
    }

    return (
        <form className="form" onSubmit={createApplication}>
            <h3>New application</h3>

            <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={event => setName(event.target.value)}
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

export default ApplicationForm