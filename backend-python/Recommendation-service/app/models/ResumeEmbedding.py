from app.db import Base
from sqlalchemy import Column,Integer
from pgvector.sqlalchemy import Vector
class ResumeEmbedding(Base):
    __tablename__="resume_embeddings"
    
    id=Column(Integer,primary_key=True,index=True,autoincrement=True)
    studentId=Column(Integer,index=True,unique=True)
    resume_embedding=Column(Vector(768))
    
    