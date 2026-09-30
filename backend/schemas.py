from enum import Enum
from pydantic import BaseModel

# enum för att begränsa vilka environments som kan skickas till deployment endpoint 
# då valideras inputen innan den når databasen
class Environment(str, Enum):
    DEVELOPMENT = "Development"
    TESTING = "Testing"
    STAGING = "Staging"
    PRODUCTION = "Production"

class ApplicationCreate(BaseModel):
    name: str
    description: str | None = None


class ReleaseCreate(BaseModel):
    application_id: int
    version: str
    description: str | None = None

class DeploymentCreate(BaseModel):
    release_id: int
    environment: Environment