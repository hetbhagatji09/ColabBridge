from fastapi import FastAPI
from py_eureka_client import eureka_client

app = FastAPI()

@app.on_event("startup")
async def startup_event():
    await eureka_client.init_async(
        eureka_server="http://localhost:8761/eureka",
        app_name="RECOMMENDATION-SERVICE",
        instance_host="localhost",  # or your machine's IP if running in Docker
        instance_port=8001
    )

@app.get("/")
async def root():
    return {"message": "Hello from Recommendation Service"}
    