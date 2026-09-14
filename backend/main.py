from fastapi import FastAPI 

from backend.database import Base, engine
from backend import models

# titta på alla modeller kopplade till Base -> skapa tabeller som saknas i db
Base.metadata.create_all(bind=engine)

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "Release Deployment Tracker API"}
