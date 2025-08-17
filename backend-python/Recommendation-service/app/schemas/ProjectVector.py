from pydantic import BaseModel

class VectorRequest(BaseModel):
    projectId: int
    content: str
