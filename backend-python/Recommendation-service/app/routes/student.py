from langchain_groq import ChatGroq
from langchain.chains import LLMChain
from langchain.prompts import PromptTemplate
from dotenv import load_dotenv
from app.db import get_db
from sqlalchemy.orm import Session
from app.models.StudentVector import StudentVector
from app.schemas.StudentResumeDto import StudentResumeDto
from app.models.ResumeEmbedding import ResumeEmbedding
from fastapi.responses import JSONResponse
from langchain_google_genai import GoogleGenerativeAIEmbeddings
import requests
from langchain_core.output_parsers import JsonOutputParser
from app.schemas.StudentVectorSchema import StudentUpdateRequest
import PyPDF2  # ✅ use PyPDF2
from io import BytesIO
from fastapi import HTTPException
import json
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
    API to:
    1. Download resume
    2. Extract structured metadata using LLaMA
    3. Create embeddings and store them with metadata in DB
    """

    # 1️⃣ Fetch resume
    response = requests.get(dto.resumeUrl)
    if response.status_code != 200:
        raise HTTPException(status_code=400, detail="Could not fetch resume")

    content_type = response.headers.get("Content-Type", "")
    resume_text = extract_text_from_pdf(response.content) if "pdf" in content_type else response.text

    # 2️⃣ Prompt for structured JSON extraction
    prompt_template = """
    You are an AI that extracts structured information from student resumes.
    ⚠️ IMPORTANT: Return ONLY valid JSON. Do not add explanations, markdown, or extra text.

    From the resume text below, extract the following fields:
    - name
    - skills (comma separated list)
    - projects (with short description)
    - technologies (comma separated list)
    - certifications
    - resume_text (original cleaned text)

    Resume:
    {resume}

    Return strictly in the following JSON format:
    {{
        "name": "<full name>",
        "skills": ["skill1", "skill2", "skill3"],
        "projects": ["project1", "project2"],
        "technologies": ["tech1", "tech2"],
        "certifications": ["cert1", "cert2"],
        "resume_text": "<cleaned text>"
    }}
    """

    prompt = PromptTemplate(input_variables=["resume"], template=prompt_template)
    chain = prompt | model
    raw_output = chain.invoke({"resume": resume_text[:6000]})

    # 3️⃣ Parse JSON safely using JsonOutputParser
    parser = JsonOutputParser()
    try:
        metadata = parser.parse(raw_output.content)
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to parse metadata: {raw_output.content} | Error: {str(e)}"
        )

    # 4️⃣ Create embedding
    text_for_embedding = " ".join(metadata.get("skills", [])) + " " \
                        + " ".join(metadata.get("projects", [])) + " " \
                        + " ".join(metadata.get("technologies", []))

    vector = embedding_model.embed_query(text_for_embedding)

    # 5️⃣ Store in DB
    resume_vec = db.query(ResumeEmbedding).filter(
        ResumeEmbedding.studentId == dto.studentId
    ).first()

    if resume_vec:
        resume_vec.resume_embedding = vector
        resume_vec.resume_metadata = metadata
    else:
        resume_vec = ResumeEmbedding(
            studentId=dto.studentId,
            resume_embedding=vector,
            resume_metadata=metadata
        )
        db.add(resume_vec)

    db.commit()
    db.refresh(resume_vec)

    print("Saved metadata: ", json.dumps(metadata, indent=2))
    print("All metadata stored successfully")

    return JSONResponse(
        content={
            "status": "success",
            "message": "Resume vector + metadata stored successfully",
            "studentId": dto.studentId
        },
        status_code=200
    )