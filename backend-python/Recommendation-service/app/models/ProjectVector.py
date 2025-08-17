from sqlalchemy import Column, Integer
from pgvector.sqlalchemy import Vector
from app.db import Base

class ProjectVector(Base):
    __tablename__ = "projectvector"

    projectId = Column(Integer, primary_key=True)  # from Java Service
    embedding = Column(Vector(768))  # store vector (from content)
