from pydantic import BaseModel

class StudentUpdateRequest(BaseModel):
    studentId: int
    skills: str   # raw skills student entered
