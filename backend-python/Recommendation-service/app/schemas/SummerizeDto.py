from app.schemas.StudentRequest import StudentRequest
from pydantic import BaseModel
from app.schemas.ProjectDto import ProjectDto
class SummerizeDto(BaseModel):
    student: StudentRequest
    project: ProjectDto