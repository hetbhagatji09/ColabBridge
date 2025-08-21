from pydantic import BaseModel
class StudentResumeDto(BaseModel):
    studentId: int
    resumeUrl: str