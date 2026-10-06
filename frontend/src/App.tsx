import { useState } from "react"

import ApplicationList from "./components/ApplicationList"
import ReleaseList from "./components/ReleaseList"
import DeploymentList from "./components/DeploymentList"
import "./App.css"

function App() {
    const [selectedApplicationId, setSelectedApplicationId] =
        useState<number | null>(null)

    const [selectedReleaseId, setSelectedReleaseId] =
        useState<number | null>(null)

    const handleApplicationSelect = (id: number) => {
        setSelectedApplicationId(id)
        setSelectedReleaseId(null)
    }

    const handleReleaseSelect = (id: number) => {
        setSelectedReleaseId(id)
    }

    return (
        <div className="app">
            <header className="header">
                <h1>Release Deployment Tracker</h1>
                <p>Track applications, releases and deployments</p>
            </header>

            <main className="content">
                <section className="panel">
                    <ApplicationList onSelect={handleApplicationSelect} />
                </section>

                {selectedApplicationId !== null && (
                    <section className="panel">
                        <ReleaseList
                            applicationId={selectedApplicationId}
                            onSelect={handleReleaseSelect}
                        />
                    </section>
                )}

                {selectedReleaseId !== null && (
                    <section className="panel">
                        <DeploymentList releaseId={selectedReleaseId} />
                    </section>
                )}
            </main>
        </div>
    )
}

export default App