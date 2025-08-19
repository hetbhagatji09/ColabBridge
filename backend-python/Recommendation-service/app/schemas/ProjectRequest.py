from typing import List
from pydantic import BaseModel


class ProjectRequest(BaseModel):
    projectId: int
    title: str
    description: str
    skills: List[str] = []
    maxStudents: int