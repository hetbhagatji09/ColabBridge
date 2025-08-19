from langchain_groq import ChatGroq
from langchain.chains import LLMChain
from langchain.prompts import PromptTemplate
from dotenv import load_dotenv
from app.db import get_db
from sqlalchemy.orm import Session
from app.models.ProjectVector import ProjectVector
from app.models.StudentVector import StudentVector
from langchain_google_genai import GoogleGenerativeAIEmbeddings
import requests
from typing import List
from sqlalchemy import select
from app.schemas.StudentRequest import StudentRequest
from app.schemas.ProjectRequest import ProjectRequest
from app.schemas.ProjectVector import VectorRequest
# from app.schemas.RecommendationRequest import RecommendationRequest
# from langchain_community.document_loaders import PyPDFLoader
load_dotenv()
from fastapi import APIRouter,Depends
router=APIRouter(prefix="/recommend",tags=["Project"])

model = ChatGroq(
    temperature=0.7,
    model_name="llama3-8b-8192"  # You can also try "llama3-8b-8192"
)

embedding_model = GoogleGenerativeAIEmbeddings(
    model="models/embedding-001"
)
from pydantic import BaseModel
class RecommendationRequest(BaseModel):
    project: ProjectRequest
    students: List[StudentRequest]
@router.get("/hellobhai")
async def getHello():
    print("Great P:ower comes great responsibility")
    prompt = PromptTemplate(
        input_variables=["question"],
        template="You are an AI assistant. Answer the following question clearly:\n\n{question}"
    )
    chain = LLMChain(llm=model, prompt=prompt)
    response = chain.run({"question": "Give me top 5 Most non veg shops in navsari dont give me anything just give me only names"})
    return response
@router.get("/hell")
async def getHello():
    text = "Hello, world!"
    vector = embedding_model.embed_query(text)
    return vector
@router.post("/vector/store")
async def storeVector(req: VectorRequest, db: Session = Depends(get_db)):
    vector=embedding_model.embed_query(req.content)
    new_vec=ProjectVector(
        projectId=req.projectId,
        embedding=vector
    )
    db.add(new_vec)
    db.commit()
    db.refresh(new_vec)
    print("Vector is succesfully saved for content like "+ req.content)
    
@router.get("/projects/{studentId}")
def getRecommendationIdsForProject(
    studentId: int,
    threshold: float = 0.5,
    limit: int = 5,
    db: Session = Depends(get_db)   # ✅ dependency injection
):
    # get student embedding
    student_vec = db.query(StudentVector).filter(StudentVector.studentId == studentId).first()
    if not student_vec:
        return []

    # use pgvector distance functions
    stmt = (
        select(ProjectVector.projectId)
        .where(1 - ProjectVector.embedding.cosine_distance(student_vec.embedding) >= threshold)
        .order_by(ProjectVector.embedding.cosine_distance(student_vec.embedding))
        .limit(limit)
    )

    results = db.execute(stmt).scalars().all()
    return results
@router.post("/student")
def getRecommendationByProjectAndStudent(
    request: RecommendationRequest,
    db: Session = Depends(get_db)
):
    """
    Recommend best students for a given project.
    Uses pgvector embeddings from DB + student ratings.
    """

    project = request.project
    students: List[StudentRequest] = request.students  # from your Java request

    # 1️⃣ Get project embedding from DB
    project_vec = db.query(ProjectVector).filter(ProjectVector.projectId == project.projectId).first()
    if not project_vec:
        return []  # project vector not found

    project_embedding = project_vec.embedding
    recommendations = []

    # 2️⃣ Loop through student applications
    for student in students:
        student_vec = db.query(StudentVector).filter(StudentVector.studentId == student.studentId).first()
        if not student_vec:
            continue  # skip if student vector not found

        student_embedding = student_vec.embedding

        # 3️⃣ Cosine similarity
        dot = sum(a * b for a, b in zip(project_embedding, student_embedding))
        norm_a = sum(a * a for a in project_embedding) ** 0.5
        norm_b = sum(b * b for b in student_embedding) ** 0.5
        cosine_sim = dot / (norm_a * norm_b)

        # Weighted score: 70% similarity + 30% rating
        rating_factor = student.ratings / 5.0  # normalize 1–5 → 0–1
        score = 0.7 * cosine_sim + 0.3 * rating_factor

        recommendations.append((student.studentId, score))

    # 4️⃣ Sort & select top N students
    recommendations.sort(key=lambda x: x[1], reverse=True)
    best_students = [sid for sid, _ in recommendations[: project.maxStudents]]

    return best_students