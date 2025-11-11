from flask import Flask, jsonify, request
from flask_cors import CORS
import requests, os
from dotenv import load_dotenv

load_dotenv()
app = Flask(__name__)
CORS(app)

def generate_powerbi_token():
    tenant_id = os.getenv("TENANT_ID")
    client_id = os.getenv("CLIENT_ID")
    client_secret = os.getenv("CLIENT_SECRET")
    report_id = os.getenv("REPORT_ID")
    group_id = os.getenv("GROUP_ID")

    # 1. Get access token from Azure AD
    token_url = f"https://login.microsoftonline.com/{tenant_id}/oauth2/v2.0/token"
    token_data = {
        "grant_type": "client_credentials",
        "client_id": client_id,
        "client_secret": client_secret,
        "scope": "https://analysis.windows.net/powerbi/api/.default"
    }
    token_res = requests.post(token_url, data=token_data)
    access_token = token_res.json().get("access_token")

    # 2. Get embed token
    headers = {
        "Authorization": f"Bearer {access_token}",
        "Content-Type": "application/json"
    }
    embed_url = f"https://api.powerbi.com/v1.0/myorg/groups/{group_id}/reports/{report_id}/GenerateToken"
    embed_body = {
        "accessLevel": "view"
    }
    embed_res = requests.post(embed_url, headers=headers, json=embed_body)

    report_info_url = f"https://api.powerbi.com/v1.0/myorg/groups/{group_id}/reports/{report_id}"
    report_info = requests.get(report_info_url, headers=headers).json()

    return {
        "embedToken": embed_res.json(),
        "embedUrl": report_info.get("embedUrl"),
        "reportId": report_id
    }

# ✅ Route 1: GET for testing or browser
@app.route("/api/powerbi-token", methods=["GET"])
def get_embed_token():
    return jsonify(generate_powerbi_token())

# ✅ Route 2: POST for frontend integration
@app.route("/getEmbedToken", methods=["POST"])
def post_embed_token():
    return jsonify(generate_powerbi_token())

if __name__ == "__main__":
    app.run(debug=True)
