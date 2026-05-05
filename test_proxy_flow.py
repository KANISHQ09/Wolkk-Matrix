import requests
import json

app_name = "gcp_cost_agent"
user_id = "asus-user"
session_id = "test-sess-proxy"

# Create session via proxy
create_url = f"http://localhost:8005/apps/{app_name}/users/{user_id}/sessions/{session_id}"
print(f"Creating session via proxy: {create_url}", flush=True)
try:
    resp = requests.post(create_url)
    print(f"Create Session Status: {resp.status_code}", flush=True)
    print(f"Create Session Body: {resp.text}", flush=True)
except Exception as e:
    print(f"Create Session Error: {e}", flush=True)

# Run agent via proxy
run_url = "http://localhost:8005/run"
payload = {
    "appName": app_name,
    "userId": user_id,
    "sessionId": session_id,
    "newMessage": {
        "role": "user",
        "parts": [{"text": "hi"}]
    }
}
print(f"Running agent via proxy: {run_url}", flush=True)
try:
    resp = requests.post(run_url, json=payload)
    print(f"Run Agent Status: {resp.status_code}", flush=True)
    print(f"Run Agent Body: {resp.text}", flush=True)
except Exception as e:
    print(f"Run Agent Error: {e}", flush=True)
