from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base

# beskriver var databasen finns och hur den ansluts
DATABASE_URL = "postgresql://hanna@localhost/release_tracker"

# sqlalchemy engine hanterar kommunikationen mellan kod och db
engine = create_engine(DATABASE_URL)

# utgångspunkt för db-modell
Base = declarative_base()