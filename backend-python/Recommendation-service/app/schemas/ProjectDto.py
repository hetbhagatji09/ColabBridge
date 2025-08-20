from pydantic import BaseModel
from typing import List
class ProjectDto(BaseModel):
    projectId: int
    title: str
    description: str
    skills: List[str]
    maxStudents: int