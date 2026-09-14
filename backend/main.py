from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session

from backend.database import Base, engine, get_db
from backend import models
from backend.models import Application

from backend.schemas import ApplicationCreate


# titta på alla modeller kopplade till Base -> skapa tabeller som saknas i db
Base.metadata.create_all(bind=engine)

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "Release Deployment Tracker API"}

@app.get("/api/applications")
def get_applications(db: Session = Depends(get_db)):    # hämta db-session när endpoint körs
    return db.query(Application).all()  # hämta alla rader fr applications

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