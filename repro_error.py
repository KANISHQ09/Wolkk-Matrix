import requests
import json

sess_id = "test-repro-sess"
create_sess_url = f"http://localhost:8005/apps/gcp_cost_agent/users/asus-user/sessions/{sess_id}"
requests.post(create_sess_url)

url = "http://localhost:8005/run"
payload = {
  "appName": "gcp_cost_agent",
  "userId": "asus-user",
  "sessionId": sess_id,
  "newMessage": {
    "role": "user",
    "parts": [
      {
        "text": "Show me a breakdown of costs by service for 202604 [GCP Project: promptwars2-495214, Billing Table: promptwars2-495214.trial.gcp_billing_export_resource_v1_011EA5_074385_C2B410]"
      }
    ]
  }
}

try:
    response = requests.post(url, json=payload, timeout=60)
    print(f"Status: {response.status_code}")
    print(f"Response: {response.text}")
except Exception as e:
    print(f"Error: {e}")
