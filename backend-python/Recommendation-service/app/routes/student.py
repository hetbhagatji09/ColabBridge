from langchain_groq import ChatGroq
from langchain.chains import LLMChain
from langchain.prompts import PromptTemplate
from dotenv import load_dotenv
from app.db import get_db
from sqlalchemy.orm import Session
from app.models.StudentVector import StudentVector
from app.schemas.StudentResumeDto import StudentResumeDto
from app.models.ResumeEmbedding import ResumeEmbedding
from langchain_google_genai import GoogleGenerativeAIEmbeddings
import requests
from app.schemas.StudentVectorSchema import StudentUpdateRequest
import PyPDF2  # ✅ use PyPDF2
import BytesIO
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

def extract_text_from_pdf(pdf_bytes: bytes) -> str:
    """Extract text from PDF using PyPDF2"""
    text = ""
    pdf_reader = PyPDF2.PdfReader(BytesIO(pdf_bytes))
    for page in pdf_reader.pages:
        text += page.extract_text() or ""
    return text

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

@router.post("/resume")
async def store_resume_vector(dto: StudentResumeDto, db: Session = Depends(get_db)):
    """
    1. Download resume
    2. Extract essential details with LLaMA (skills, experiences, projects, tech)
    3. Convert into embeddings
    4. Store in DB
    """
    # 1️⃣ Fetch resume
    response = requests.get(dto.resumeUrl)
    if response.status_code != 200:
        return {"error": "Could not fetch resume"}

    content_type = response.headers.get("Content-Type", "")
    resume_text = ""

    if "pdf" in content_type:
        resume_text = extract_text_from_pdf(response.content)
    else:
        resume_text = response.text  # fallback for .txt/.docx

    # 2️⃣ Summarize / Extract essentials using LLaMA
    prompt = PromptTemplate(
        input_variables=["resume"],
        template="""
        You are an AI that extracts structured information from student resumes.
        From the following resume, extract only the most relevant details and remove the stop words:

        1. Key technical skills
        3. Major projects
        4. Technologies / tools used
        5. Certifications

        Resume:
        {resume}

        Return results as a **short clean paragraph**.
        """
    )

    chain = LLMChain(llm=model, prompt=prompt)
    essential_text = chain.run({"resume": resume_text[:6000]})

    # 3️⃣ Convert to Embeddings
    vector = embedding_model.embed_query(essential_text)

    # 4️⃣ Store in DB
    resume_vec = db.query(ResumeEmbedding).filter(ResumeEmbedding.studentId == dto.studentId).first()
    if resume_vec:
        resume_vec.embedding = bytes(vector)  # overwrite
    else:
        resume_vec = ResumeEmbedding(studentId=dto.studentId, embedding=bytes(vector))
        db.add(resume_vec)
    print("resume vector is stored")
    db.commit()
    db.refresh(resume_vec)

    # return {"studentId": dto.studentId, "message": "Resume vector stored successfully"}
