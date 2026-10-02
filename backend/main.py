from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from sqlalchemy.orm import Session

from backend.database import Base, engine, get_db
from backend import models
from backend.models import Application, Release, Deployment

from backend.schemas import ApplicationCreate, ReleaseCreate, DeploymentCreate


# titta på alla modeller kopplade till Base -> skapa tabeller som saknas i db
Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Release Deployment Tracker API"}

@app.get("/api/applications")
def get_all_applications(db: Session = Depends(get_db)):    # hämta db-session när endpoint körs
    return db.query(Application).all()  # hämta alla rader fr applications

@app.get("/api/applications/{application_id}")
def get_application_by_id(
    application_id: int,
    db: Session = Depends(get_db)
):
    application = db.query(Application).filter(
        Application.id == application_id
    ).first()

    if application is None:
        raise HTTPException(
            status_code=404,
            detail="Application not found"
        )

    return application

@app.post("/api/applications")
def create_application(
    application: ApplicationCreate,
    db: Session = Depends(get_db)

):
    new_application = Application(
        name=application.name,
        description=application.description
    )

    db.add(new_application)
    db.commit()
    db.refresh(new_application) # hämtar tillbaka sparade posten från db -> får det automatiskt skapade id-värdet

    return new_application

@app.post("/api/releases")
def create_release(
    release: ReleaseCreate,
    db: Session = Depends(get_db)
):
    
    # validationfråga: finns application med X id?
    application = db.query(Application).filter(
        Application.id == release.application_id
    ).first()

    if application is None:
        raise HTTPException(
            status_code=404,
            detail="Application not found"
        )
    
    new_release = Release(
        application_id=release.application_id,
        version=release.version,
        description=release.description
    )

    db.add(new_release)
    db.commit()
    db.refresh(new_release)

    return new_release


@app.get("/api/releases/{release_id}")
def get_release_by_id(
    release_id: int,
    db: Session = Depends(get_db)
):
    release = db.query(Release).filter(
        Release.id == release_id
    ).first()

    if release is None:
        raise HTTPException(
            status_code=404,
            detail="Release not found"
        )

    return release

@app.get("/api/applications/{application_id}/releases")
def get_releases(
    application_id: int,
    db: Session = Depends(get_db)
):
    return (
        db.query(Release)
        .filter(Release.application_id == application_id)
        .all()
    )


@app.post("/api/deployments")
def create_deployment(
    deployment: DeploymentCreate,
    db: Session = Depends(get_db)

):
    release = db.query(Release).filter(
        Release.id == deployment.release_id
    ).first()

    if release is None:
        raise HTTPException(
            status_code=404,
            detail="Release not found"
        )

    new_deployment = Deployment(
        release_id=deployment.release_id,
        environment=deployment.environment
    )

    db.add(new_deployment)
    db.commit()
    db.refresh(new_deployment)

    return new_deployment

@app.get("/api/release/{release_id}/deployments")
def get_deployments(
        release_id: int,
        db: Session = Depends(get_db)

):
    return (
        db.query(Deployment)
        .filter(Deployment.release_id == release_id) # hämtar alla deployments som tillhör release 3
        .all()
    )