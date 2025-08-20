from pydantic import BaseModel
from typing import List
from app.schemas.ProjectRequest import ProjectRequest
from app.schemas.StudentRequest import StudentRequest


class RecommendationRequest(BaseModel):
    project: ProjectRequest
    students: List[StudentRequest]
