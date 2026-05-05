import requests
import json

url = "http://localhost:8004/run"
payload = {
    "appName": "gcp_cost_agent",
    "userId": "asus-user",
    "sessionId": "test-sess-123",
    "newMessage": {
        "role": "user",
        "parts": [{"text": "hi"}]
    }
}
headers = {"Content-Type": "application/json"}

try:
    response = requests.post(url, json=payload, headers=headers)
    print(f"Status Code: {response.status_code}")
    print(f"Response Body: {response.text}")
except Exception as e:
    print(f"Error: {e}")
