from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
import httpx
import uvicorn

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.api_route("/{path:path}", methods=["GET", "POST", "PUT", "DELETE"])
async def proxy_catch_all(request: Request, path: str):
    method = request.method
    body = await request.body()
    headers = dict(request.headers)
    
    # Remove headers that might cause issues with the backend
    headers_to_remove = ["host", "content-length", "origin", "referer"]
    for h in headers_to_remove:
        if h in headers:
            del headers[h]
        
    async with httpx.AsyncClient() as client:
        url = f"http://localhost:8004/{path}"
        query_params = request.query_params
        
        try:
            response = await client.request(
                method,
                url,
                content=body,
                params=query_params,
                headers=headers,
                timeout=300.0
            )
            try:
                return response.json()
            except:
                error_body = response.text
                message = "Non-JSON response"
                if "RESOURCE_EXHAUSTED" in error_body:
                    message = "Intelligence Engine: API Quota Exceeded. Please retry in 1 minute."
                elif "429" in error_body:
                    message = "Intelligence Engine: Too Many Requests (429)."
                
                return {"error": message, "status_code": response.status_code, "body": error_body[:200]}
        except Exception as e:
            return {"error": str(e)}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8005)
