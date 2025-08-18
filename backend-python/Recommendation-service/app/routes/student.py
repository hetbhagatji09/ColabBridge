from langchain_groq import ChatGroq
from langchain.chains import LLMChain
from langchain.prompts import PromptTemplate
from dotenv import load_dotenv
from app.db import get_db
from sqlalchemy.orm import Session
from app.models.StudentVector import StudentVector

from langchain_google_genai import GoogleGenerativeAIEmbeddings
import requests
from app.schemas.StudentVectorSchema import StudentUpdateRequest
# from langchain_community.document_loaders import PyPDFLoader
load_dotenv()
from fastapi import APIRouter,Depends
router=APIRouter(prefix="/studentvector",tags=["student"])

model = ChatGroq(
    temperature=0.7,
    model_name="llama3-8b-8192"  # You can also try "llama3-8b-8192"
)

embedding_model = GoogleGenerativeAIEmbeddings(
    model="models/embedding-001"
)

@router.post("/store")
async def storeVector(req: StudentUpdateRequest, db: Session = Depends(get_db)):
    # Check if vector already exists
    student_vec = db.query(StudentVector).filter(StudentVector.studentId == req.studentId).first()

    # ✅ Directly use the raw skills (no LLM prompt)
    skills_text = req.skills

    # Generate embedding for given skills
    vector = embedding_model.embed_query(skills_text)

    if student_vec:
        student_vec.embedding = vector
    else:
        student_vec = StudentVector(studentId=req.studentId, embedding=vector)
        db.add(student_vec)
    print("Studfent vector got stored")
    db.commit()
    db.refresh(student_vec)

    
