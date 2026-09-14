from sqlalchemy import create_engine

# beskriver var databasen finns och hur den ansluts
DATABASE_URL = "postgresql://hanna@localhost/release_tracker"

# sqlalchemy engine hanterar kommunikationen mellan kod och db
engine = create_engine(DATABASE_URL)