from pydantic import BaseModel


class ApplicationCreate(BaseModel):
    name: str
    description: str | None = None


class ReleaseCreate(BaseModel):
    application_id: int
    version: str
    description: str | None = None