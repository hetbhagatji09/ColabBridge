from langchain_groq import ChatGroq
from langchain.chains import LLMChain
from langchain.prompts import PromptTemplate
from dotenv import load_dotenv
from app.db import get_db
from sqlalchemy.orm import Session
from app.models.ProjectVector import ProjectVector

from langchain_google_genai import GoogleGenerativeAIEmbeddings
import requests
from app.schemas.ProjectVector import VectorRequest
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