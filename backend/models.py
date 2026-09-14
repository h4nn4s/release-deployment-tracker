from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey
from sqlalchemy import func

from backend.database import Base

# application ärver från Base -> sqlalchemy förstår att klassen ska representera en db-tabell
class Application(Base):
    __tablename__ = "applications"

    id = Column(Integer, primary_key=True)  # unik identifierare
    name = Column(String(100), nullable=False)  # måste ha ett namn
    description = Column(Text) # valfri
    created_at = Column(DateTime, server_default=func.now()) # auto id

class Release(Base):
    __tablename__ = "releases"

    id = Column(Integer, primary_key=True)
    application_id = Column(Integer, ForeignKey("applications.id"), nullable=False)
    version = Column(String(50), nullable=False) # innehåller id för den application som release tillhör
    description = Column(Text)
    created_at = Column(DateTime, server_default=func.now())

class Deployment(Base):
    __tablename__ = "deployments"
    id = Column(Integer, primary_key=True)
    release_id = Column(Integer, ForeignKey("releases.id"), nullable=False)
    environment = Column(String(50), nullable=False) # ex dev, test, stage
    deployed_at = Column(DateTime, server_default=func.now())


