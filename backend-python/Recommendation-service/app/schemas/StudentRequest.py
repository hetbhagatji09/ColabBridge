from typing import List,Optional
from pydantic import BaseModel

class StudentRequest(BaseModel):
    studentId: int
    Skills: List[str] = []
    ratings: float = 0
    resumeUrl: Optional[str]