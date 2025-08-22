from app.db import Base
from sqlalchemy import Column,Integer,JSON
from pgvector.sqlalchemy import Vector
from sqlalchemy.dialects.postgresql import JSONB
class ResumeEmbedding(Base):
    __tablename__="resume_embeddings"
    
    id=Column(Integer,primary_key=True,index=True,autoincrement=True)
    studentId=Column(Integer,index=True,unique=True)
    resume_embedding=Column(Vector(768))
    resume_metadata=Column(JSONB)
    
    