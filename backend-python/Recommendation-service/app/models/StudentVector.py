from sqlalchemy import Column, Integer
from pgvector.sqlalchemy import Vector
from app.db import Base

class StudentVector(Base):
    __tablename__ = "studentvector"

    studentId = Column(Integer, primary_key=True)  # from Java service
    embedding = Column(Vector(768))  # embedding of student skills/projects
