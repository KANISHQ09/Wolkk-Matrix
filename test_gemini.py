import requests
import json
import os

api_key = "AIzaSyAJyfJr5rBqaDqBkRSgPYDu8Hhlw_TC5Tk"
url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key={api_key}"

payload = {
    "contents": [{
        "parts": [{"text": "Hello, are you working?"}]
    }]
}

print("Testing Gemini API...", flush=True)
try:
    response = requests.post(url, json=payload)
    print(f"Status Code: {response.status_code}", flush=True)
    print(f"Response: {response.text}", flush=True)
except Exception as e:
    print(f"Error: {e}", flush=True)
