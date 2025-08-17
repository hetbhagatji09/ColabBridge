# app/main.py
from fastapi import FastAPI
from py_eureka_client import eureka_client
from app.db import Base, engine, SessionLocal
from app.routes.project import router as project_router
app = FastAPI()

# ✅ Initialize DB and insert sample record
def init_db():
    Base.metadata.create_all(bind=engine)

@app.on_event("startup")
async def startup_event():
    # Register with Eureka
    await eureka_client.init_async(
        eureka_server="http://localhost:8761/eureka",
        app_name="RECOMMENDATION-SERVICE",
        instance_host="localhost",  # or container IP if in Docker
        instance_port=8001
    )
    # Initialize database
    init_db()

    print("✅ Database initialized and sample document inserted.")

app.include_router(project_router)